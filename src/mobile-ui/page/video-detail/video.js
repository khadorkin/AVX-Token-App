/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme';
import { BusyMessage } from 'components/common';
import SubHeader from 'components/subHeader';
import CardMedia from 'components/cardMedia';
import Icon from 'components/icon';
import UriIndicator from 'components/uriIndicator';
import CustomButton from 'components/customButton';
import { ScrollView, Text, View, Platform } from 'components/core';

const CardContent = View.extend`
  padding: 0 ${theme.cardPadding / 2}px;
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const CardTitle = styled(Text)`
  ${theme.heading2};
  margin: 4px 0px 2px;
`;
const CardIcons = View.extend`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  align-items: center;
  flex-grow: 1;
`;

const Content = View.extend`
  align-self: center;
  max-width: 520px;
`;

const CardDescription = View.extend`
  margin: 2px 0px 2px;
`;

const osDescriptionStyles = {
  web: `
    overflow: hidden;
    text-overflow: ellipsis;
  `,
};
const DescriptionLine = styled(Text)`
  ${osDescriptionStyles[Platform.OS] || ''};
`;
const style = { marginTop: 12, marginBottom: 12 };

class VideoDetailPage extends React.PureComponent {
  static propTypes = {
    metadata: PropTypes.object,
    claim: PropTypes.object,
    fileInfo: PropTypes.object,
    uri: PropTypes.string,
    rewardedContentClaimIds: PropTypes.array,
    infoHash: PropTypes.string.isRequired,
  };

  static defaultProps = {
    metadata: {},
    claim: {},
    fileInfo: {},
    uri: '',
    rewardedContentClaimIds: [],
  };

  render() {
    const { metadata = {}, claim, fileInfo, uri, infoHash, rewardedContentClaimIds } = this.props;
    const featureUriKeys = []; //Object.keys(featuredUris);
    const hasContent = true || (typeof featuredUris === 'object' && featureUriKeys.length);
    const failedToLoad = false && !hasContent;

    const title = metadata.title || uri;
    const description = metadata.description || '';
    const thumbnail = metadata && metadata.thumbnail ? metadata.thumbnail : null;
    const isRewardContent = claim && rewardedContentClaimIds.includes(claim.claim_id);

    return (
      <ScrollView contentContainerStyle={{ flexShrink: 0 }}>
        <SubHeader fullWidth smallMargin />
        <Content>
          {!hasContent && <BusyMessage message={__('Fetching content')} />}
          {failedToLoad && <Text className="empty">{__('Failed to load landing content.')}</Text>}
          <CardMedia title={title} thumbnail={thumbnail} />
          <CustomButton color="#424242" style={style}>
            <CustomButton.Link to={`/player/${infoHash}`}>Play</CustomButton.Link>
          </CustomButton>
          <CardContent>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              {description
                .split('\n')
                .map((d, idx) => <DescriptionLine key={idx}>{d}</DescriptionLine>)}
            </CardDescription>
            <CardIcons>
              <UriIndicator uri={uri} link span smallCard style={{ flexGrow: 1 }} />
              {isRewardContent && <Icon icon={Icon.FEATURED} leftPad />}
              {fileInfo && <Icon icon={Icon.LOCAL} leftPad />}
            </CardIcons>
          </CardContent>
        </Content>
      </ScrollView>
    );
  }
}

export default VideoDetailPage;
