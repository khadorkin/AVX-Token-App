/* eslint-disable */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import path from 'path';
import streamToBlobURL from 'stream-to-blob-url';
import videostream from 'videostream';
import Debug from 'debug';
// import isAscii from 'is-ascii';
import MediaElementWrapper from 'mediasource';
import mimeMap from 'render-media/lib/mime.json';
import { View } from 'components/core';
import { onProgress } from 'redux/actions/media';
import renderMedia from 'render-media';

export const mime = mimeMap;

const debug = Debug('render-media');

const VIDEOSTREAM_EXTS = ['.m4a', '.m4v', '.mp4'];
const MEDIASOURCE_VIDEO_EXTS = ['.m4v', '.mkv', '.mp4', '.webm'];
const MEDIASOURCE_AUDIO_EXTS = ['.m4a', '.mp3'];
export const MEDIASOURCE_EXTS = [].concat(MEDIASOURCE_VIDEO_EXTS, MEDIASOURCE_AUDIO_EXTS);
const AUDIO_EXTS = ['.aac', '.oga', '.ogg', '.wav'];
const IMAGE_EXTS = ['.bmp', '.gif', '.jpeg', '.jpg', '.png', '.svg'];
// const IFRAME_EXTS = ['.css', '.html', '.js', '.md', '.pdf', '.txt'];

// Maximum file length for which the Blob URL strategy will be attempted
// See: https://github.com/feross/render-media/issues/18
const MAX_BLOB_LENGTH = 200 * 1000 * 1000; // 200 MB

const MediaSource = typeof global.window !== 'undefined' && window.MediaSource;

const getBlobURL = (file, cb) => {
  const extname = path.extname(file.name).toLowerCase();
  streamToBlobURL(file.createReadStream(), mime[extname], cb);
};

const validateFile = file => {
  if (file == null) {
    return 'file cannot be null or undefined';
  }
  if (typeof file.name !== 'string') {
    return 'missing or invalid file.name property';
  }
  if (typeof file.createReadStream !== 'function') {
    return 'missing or invalid file.createReadStream property';
  }
  return undefined;
};

const validateTorrent = torrent => {
  if (!torrent) {
    return 'torrent cannot be null or undefined';
  } else if (!torrent.mediaFile) {
    return 'torrent.mediaFile cannot be empty';
  }
  return undefined;
};

const getCodec = name => {
  const extname = path.extname(name).toLowerCase();
  return {
    '.m4a': 'audio/mp4; codecs="mp4a.40.5"',
    '.m4v': 'video/mp4; codecs="avc1.640029, mp4a.40.5"',
    '.mkv': 'video/webm; codecs="avc1.640029, mp4a.40.5"',
    '.mp3': 'audio/mpeg',
    '.mp4': 'video/mp4; codecs="avc1.640029, mp4a.40.5"',
    '.webm': 'video/webm; codecs="opus, vorbis, vp8"',
  }[extname];
};

const AudioTag = props => <audio {...props} />; // eslint-disable-line jsx-a11y/media-has-caption
const VideoBase = props => <video {...props} />; // eslint-disable-line jsx-a11y/media-has-caption
const VideoTag = styled(VideoBase)`
  width: 100%;
`;

export default class Video extends React.Component {
  static propTypes = {
    autoplay: PropTypes.bool,
    maxBlobLength: PropTypes.number,
    file: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    autoplay: true,
    maxBlobLength: MAX_BLOB_LENGTH,
    file: undefined,
  };

  state = {};

  shouldComponentUpdate(nextState, nextProps) {
    const currentHash = (this.props.torrent || {}).infoHash;
    const nextHash = (nextProps.torrent || {}).infoHash
    return currentHash !== nextHash;
  }

  onComponentWillUnmount() {
    // Unload the media element so that Chromium stops trying to fetch data
    const tag = this.elem;
    if (!tag) return;
    tag.pause();
    tag.src = '';
    tag.load();
  }

  onRef = component => {
    const node = ReactDOM.findDOMNode(component);
    if (node !== this.elem) {
      this.elem = node;
      console.warn('videorenderer.new-ref', this.props.torrent);
      return !!node;
    }
  };

  onLoadStart = () => {
    if (this.props.autoplay) {
      this.elem.play();
    }
  };

  onCanPlay = () => {
    console.warn('can-play');
    // cb(null, elem);
  };

  onFallbackToMediaSource = error => {
    console.warn(error);
    this.setState({
      fallback: 'mediasource',
    });
  };
  onFallbackToBlobURL = error => {
    console.warn(error);
    const {
      props: { file, maxBlobLength },
    } = this;
    if (typeof file.length === 'number' && file.length > maxBlobLength) {
      debug(
        'File length too large for Blob URL approach: %d (max: %d)',
        file.length,
        maxBlobLength
      );
      throw new Error(
        `File length too large for Blob URL approach: ${file.length} (max: ${maxBlobLength})`
      );
    }
    this.setState({
      fallback: 'bloburl',
    });
  };

  onProgress = event => {
    this.setState({
      currentTime: this.elem.currentTime,
    });
  };

  onRefMediasource = component => {
    if (!this.onRef(component)) {
      return;
    }
    const wrapper = new MediaElementWrapper(this.elem);
    if (mediaFile) {
      const writable = wrapper.createWriteStream(getCodec(mediaFile.name));
      mediaFile.createReadStream().pipe(writable);
    }
  };
  onRefVideostream = component => {
    if (this.onRef(component)) {
      const { torrent = {} } = this.props;
      if (torrent.mediaFile) {
        this.stream = videostream(torrent.mediaFile, this.elem);
      }
    }
  };

  fatalError = err => {
    console.error(this.stream && this.stream.detailedError || err);
  };

  render() {
    const {
      props: { torrent, autoplay, maxBlobLength, children, poster, ...props },
    } = this;
    let ref = this.onRefVideostream;
    let Component = VideoTag;

    const validationError = validateTorrent(torrent);
    if (validationError) {
      console.warn(validationError);
      // return <View {...props}>{children}</View>;
    } else {
      const { mediaFile = { name: 'Sintel.mp4' } } = torrent || {};
      const extname = path.extname(mediaFile.name).toLowerCase();
      // const currentTime = 0;
      const tagName = MEDIASOURCE_AUDIO_EXTS.indexOf(extname) === -1 ? 'video' : 'audio';
      const Component = tagName === 'video' ? VideoTag : AudioTag;

      if (MediaSource && this.state.fallback !== 'bloburl') {
        if (VIDEOSTREAM_EXTS.indexOf(extname) >= 0 && this.state.fallback !== 'videostream') {
          ref = this.onRefVideostream;
        } else {
          ref = this.onRefMediasource;
        }
      } else {
        ref = this.onRef;
      }

      if (!this.state.blobSrc && this.props.file) {
        getBlobURL(mediaFile, (err, url) => {
          if (err) {
            this.fatalError(err);
            return;
          }
          this.setState({
            blobSrc: url,
          });
          // if (currentTime) {
          //   elem.currentTime = currentTime;
          // }
        });
      }
    }

    return (
      <Component
        key={torrent && torrent.infoHash}
        onError={this.fatalError}
        onLoadStart={this.onLoadStart}
        onCanPlay={this.onCanPlay}
        src={this.state.blobSrc}
        controls={true}
        poster={poster}
        preload="metadata"
        ref={ref}
      />
    );
  }
}
