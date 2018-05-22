/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import path from 'path';
import { View, Text } from 'components/core';
// import CardMedia from 'components/cardMedia';
import Renderer, { MEDIASOURCE_EXTS, AUDIO_EXTS, IMAGE_EXTS } from './renderer';
import Player from './player';

const Placeholder = View.extend`
  align-items: stretch;
  justify-content: stretch;
  min-height: 120px;
  min-width: 120px;
  position: relative;
`;

const Cover = View.extend`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  align-items: center;
  justify-content: center;
`;

const validateTorrent = torrent => {
  if (!torrent) {
    return 'torrent cannot be null or undefined';
  } else if (!torrent.mediaFile) {
    return 'torrent.mediaFile cannot be empty';
  }
  return undefined;
};

class TorrentVideo extends React.Component {
  static propTypes = {
    infoHash: PropTypes.string,
  };
  static defaultProps = {
    infoHash: undefined,
  };

  componentWillMount() {
    this.props.onPlay();
  }

  getPlayingTorrentSummary = () => this.props.torrent || {};
  getPlayingTorrentProgress = () => this.props.progress || {};

  render() {
    const {
      // eslint-disable-next-line no-unused-vars
      props: {
        infoHash,
        torrent,
        progress,
        autoplay,
        maxBlobLength,
        thumbnail,
        children,
        onPlay,
        ...props
      },
    } = this;
    // const validationError = validateTorrent(torrent);
    // if (!torrent || !torrent.mediaFile || validationError) {
    //   return (
    //     <Placeholder {...props}>
    //       {children}
    //       <Cover>
    //         <Text>{ validationError || 'Loading' }</Text>
    //       </Cover>
    //     </Placeholder>
    //   );
    // }

    const { mediaFile = { name: 'Sintel.mp4' } } = torrent || {};

    const extname = path.extname(mediaFile.name).toLowerCase();

    if (MEDIASOURCE_EXTS.indexOf(extname) >= 0) {
      return <Renderer autoplay={autoplay} torrent={torrent} poster={thumbnail} {...props} />;
    } else if (AUDIO_EXTS.indexOf(extname) >= 0) {
      return <Text>TODO: implement audio</Text>;
    } else if (IMAGE_EXTS.indexOf(extname) >= 0) {
      return <Text>TODO: implement image</Text>;
    }
    return <Text>Unknown media</Text>;

    // return <Renderer autoplay={false} torrent={torrent} {...props} />;
    // return (
    //   <Player
    //     getPlayingTorrentSummary={this.getPlayingTorrentSummary}
    //     getPlayingTorrentProgress={this.getPlayingTorrentProgress}
    //   />
    // );
  }
}

export default TorrentVideo;
