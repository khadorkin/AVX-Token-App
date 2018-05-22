/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import Link from 'components/link';
import { View, Text } from 'components/core';
import theme from 'theme';

const Inner = View.extend`
  flex-direction: row;
  align-items: center;
  height: ${theme.iconSize}px;
`;

class UriIndicator extends React.PureComponent {
  static propTypes = {
    claim: PropTypes.object,
    link: PropTypes.bool,
    uri: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
    isResolvingUri: PropTypes.bool,
    children: PropTypes.element,
  };

  static defaultProps = {
    claim: undefined,
    link: false,
    isResolvingUri: false,
    children: null,
  };

  componentWillMount() {
    this.resolve(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.resolve(nextProps);
  }

  resolve(props) {
    const { isResolvingUri, resolveUri, claim, uri } = props;

    if (!isResolvingUri && claim === undefined && uri) {
      resolveUri(uri);
    }
  }

  render() {
    // const { claim, link, uri, isResolvingUri, smallCard, span } = this.props;
    const { claim, link, isResolvingUri, children } = this.props;

    if (isResolvingUri && !claim) {
      return <Text className="empty">Validating...</Text>;
    }

    if (!claim) {
      return <Text className="empty">Unused</Text>;
    }

    const {
      channel_name: channelName,
      has_signature: hasSignature,
      signature_is_valid: signatureIsValid,
      value,
    } = claim;
    const channelClaimId =
      value && value.publisherSignature && value.publisherSignature.certificateId;

    if (!hasSignature || !channelName) {
      return <Text className="empty">Anonymous</Text>;
    }

    let icon;
    let channelLink;
    let modifier;

    if (signatureIsValid) {
      modifier = 'valid';
      channelLink = link ? `/video/${channelClaimId}` : false;
    } else {
      icon = 'times-circle';
      modifier = 'invalid';
    }

    const inner = (
      <Inner>
        <Text>
          {/*className=classnames('channel-name', {
            'channel-name--small': smallCard,
            'button-text no-underline': link,
          })*/}
          {channelName}{' '}
        </Text>
        {!signatureIsValid ? (
          <Icon icon={icon} className={`channel-indicator__icon channel-indicator__-${modifier}`} />
        ) : null}
        {children}
      </Inner>
    );

    if (!channelLink) {
      return inner;
    }

    return (
      <Link to={channelLink} className="no-underline">
        {inner}
      </Link>
    );
  }
}

export default UriIndicator;
