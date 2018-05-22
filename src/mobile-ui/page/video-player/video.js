/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import theme from 'theme';
import { BusyMessage } from 'components/common';
// import CardMedia from 'components/cardMedia';
// import Video from 'components/player';
// import UriIndicator from 'components/uriIndicator';
import { Text, View } from 'components/core';
import { StateComponent } from 'components/react';

const Content = View.extend`
  align-self: stretch;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

class VideoDetailPage extends StateComponent {
  static propTypes = {
    metadata: PropTypes.object,
    uri: PropTypes.string,
    addTorrent: PropTypes.func.isRequired,
  };

  static defaultProps = {
    metadata: {},
    uri: '',
  };

  state = {};

  componentDidMount() {
    import('components/player').then(Player => this.setState({ Player: Player.default }));
  }

  onPlay = () => {
    const torrentId = 'https://webtorrent.io/torrents/sintel.torrent';
    this.props.addTorrent(torrentId);
  };

  render() {
    const { metadata = {}, uri } = this.props;
    const featureUriKeys = []; //Object.keys(featuredUris);
    const hasContent = true || (typeof featuredUris === 'object' && featureUriKeys.length);
    const failedToLoad = false && !hasContent;
    const infoHash = '08ada5a7a6183aae1e09d831df6748d566095a10';

    const { Player } = this.state;
    const title = metadata.title || uri;
    const thumbnail = metadata && metadata.thumbnail ? metadata.thumbnail : null;

    const video = Player ? (
      <Player infoHash={infoHash} onPlay={this.onPlay} thumbnail={thumbnail} autoplay={false} />
    ) : null;
    return (
      <Content>
        {!hasContent && <BusyMessage message={__('Fetching content')} />}
        {failedToLoad && <Text className="empty">{__('Failed to load landing content.')}</Text>}
        {video}
      </Content>
    );
  }
}

export default VideoDetailPage;
