/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { normalizeURI, uriInfoHash } from 'utils/lbryURI';
import CardMedia from 'components/cardMedia';
import Link from 'components/link';
import { TruncatedText } from 'components/common';
import Icon from 'components/icon';
import UriIndicator from 'components/uriIndicator';
// import TruncatedMarkdown from 'components/truncatedMarkdown';
import * as icons from 'constants/icon';
import { View } from 'components/core';
import theme from 'theme';

/* link
  transition-property: transform;
  transition-duration: 0.2s;
  transition-timing-function: ${theme.animationStyle};*/
const Card = Link.extend`
  max-width: ${theme.card.maxWidth}px;
  min-height: ${theme.card.maxWidth}px;
  max-height: ${theme.card.maxWidth}px;
  background: ${theme.card.bg};
  box-shadow: ${theme.shadow.layer};
  border-radius: ${theme.card.radius};
  margin: ${theme.card.margin / 2}px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: ${theme.card.width}px;
  flex-wrap: nowrap;
  align-items: stretch;
  position: relative;
`;

// &:hover {
//   position: relative;
//   z-index: 1;
//   box-shadow: ${theme.boxShadowFocus};
//   transform: scale(${theme.card.linkScaling} props.theme.card.hoverTranslate});
//   transform-origin: 50% 50%;
//   /* overflow-x: visible;
//   overflow-y: visible; */
// }
// .card--small {
//   .card__title-primary,
//   .card__title-identity,
//   .card__actions,
//   .card__content,
//   .card__subtext {
//     padding: 0 calc(var(--card-padding) / 2);
//   }
// }

const CardContent = styled(View)`
  padding: 0 ${theme.card.padding / 2}px;
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CardTitle = TruncatedText.extend`
  margin: 8px 0px 2px;
  flex: 0 0 auto;
`;

// color: ${theme.colorHelp};
// font-size: 0.85em;
// line-height: ${theme.fontLineHeight / 0.85};
const CardIcons = styled(View)`
  display: flex;
  flex-direction: row-reverse;
  flex-shrink: 0;
  align-items: flex-end;
  flex-grow: 1;
`;

class FileCard extends React.PureComponent {
  static propTypes = {
    claim: PropTypes.object.isRequired,
    fileInfo: PropTypes.object,
    metadata: PropTypes.object.isRequired,
    uri: PropTypes.string.isRequired,
    rewardedContentClaimIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    fileInfo: undefined,
    // isResolvingUri: false,
  };

  componentWillMount() {
    this.resolve(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.resolve(nextProps);
  }

  // eslint-disable-next-line class-methods-use-this
  resolve(props) {
    const { isResolvingUri, resolveUri, claim, uri } = props;

    if (!isResolvingUri && claim === undefined && uri) {
      resolveUri(uri);
    }
  }

  render() {
    const { claim, fileInfo, metadata, rewardedContentClaimIds } = this.props;

    const uri = normalizeURI(this.props.uri);
    const infoHash = uriInfoHash(this.props.uri);
    const title = metadata && metadata.title ? metadata.title : uri;
    const thumbnail = metadata && metadata.thumbnail ? metadata.thumbnail : null;
    const isRewardContent = claim && rewardedContentClaimIds.includes(claim.claim_id);

    // let description = '';
    // if (isResolvingUri && !claim) {
    //   description = __('Loading...');
    // } else if (metadata && metadata.description) {
    //   description = metadata.description;
    // } else if (claim === null) {
    //   description = __('This address contains no content.');
    // }

    return (
      <Card to={`/video/${infoHash}?uri=${uri}`} className="card__link">
        <CardMedia title={title} thumbnail={thumbnail} />
        <CardContent>
          <CardTitle lines={1}>{title}</CardTitle>
          <UriIndicator uri={uri} span smallCard>
            <CardIcons>
              {isRewardContent && <Icon icon={icons.FEATURED} leftPad />}
              {fileInfo && <Icon icon={icons.LOCAL} leftPad />}
            </CardIcons>
          </UriIndicator>
        </CardContent>
      </Card>
    );
  }
}

export default FileCard;
