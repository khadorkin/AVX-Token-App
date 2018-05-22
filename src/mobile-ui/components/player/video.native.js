/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'components/core';

class TorrentVideo extends React.Component {
  static propTypes = {
    infoHash: PropTypes.string,
  };
  static defaultProps = {
    infoHash: undefined,
  };

  render() {
    const {
      props: { torrent, infoHash, ...props },
    } = this;
    return <View {...props} id={`video-player-${infoHash}`} />;
  }
}

export default TorrentVideo;
