import React from 'react';
import styled from 'styled-components';
import { normalizeURI } from 'utils/lbryURI';
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
const Card = styled(Link)`
  max-width: ${theme.cardMaxWidth};
  height: ${theme.cardMaxWidth};
  background: ${theme.cardBg};
  box-shadow: ${theme.boxShadowLayer};
  border-radius: ${theme.cardRadius};
  margin: ${theme.cardMargin / 2}px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: ${theme.cardMaxWidth};
  align-items: stretch;

  &:hover {
    position: relative;
    z-index: 1;
    box-shadow: ${theme.boxShadowFocus};
    transform: scale(${theme.cardLinkScaling} props.theme.cardHoverTranslate});
    transform-origin: 50% 50%;
    /* overflow-x: visible;
    overflow-y: visible; */
  }
`;
// .card--small {
//   .card__title-primary,
//   .card__title-identity,
//   .card__actions,
//   .card__content,
//   .card__subtext {
//     padding: 0 calc(var(--card-padding) / 2);
//   }
// }

const CardContent = View.extend`
  padding: 0 ${theme.cardPadding / 2}px;
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CardTitle = TruncatedText;

// color: ${theme.colorHelp};
// font-size: 0.85em;
// line-height: ${theme.fontLineHeight / 0.85};
const CardIcons = View.extend`
  display: flex;
  flex-direction: row-reverse;
  flex-shrink: 0;
  align-items: flex-end;
  flex-grow: 1;
`;

class FileCard extends React.PureComponent {
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
    const {
      claim,
      fileInfo,
      metadata,
      isResolvingUri,
      navigate,
      rewardedContentClaimIds,
    } = this.props;

    const uri = normalizeURI(this.props.uri);
    const title = metadata && metadata.title ? metadata.title : uri;
    const thumbnail = metadata && metadata.thumbnail ? metadata.thumbnail : null;
    const isRewardContent = claim && rewardedContentClaimIds.includes(claim.claim_id);

    let description = '';
    if (isResolvingUri && !claim) {
      description = __('Loading...');
    } else if (metadata && metadata.description) {
      description = metadata.description;
    } else if (claim === null) {
      description = __('This address contains no content.');
    }

    return (
      <Card onClick={() => navigate('/show', { uri })} className="card__link">
        <CardMedia title={title} thumbnail={thumbnail} />
        <CardContent>
          <CardTitle lines={1}>{title}</CardTitle>
          <UriIndicator uri={uri} link span smallCard />
          <CardIcons>
            {isRewardContent && <Icon icon={icons.FEATURED} leftPad />}
            {fileInfo && <Icon icon={icons.LOCAL} leftPad />}
          </CardIcons>
        </CardContent>
      </Card>
    );
  }
}

export default FileCard;
