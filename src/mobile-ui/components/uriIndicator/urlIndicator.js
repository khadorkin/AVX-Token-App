/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import Link from 'components/link';
import { buildURI } from 'utils/lbryURI';
import { View, Text } from 'components/core';

class UriIndicator extends React.PureComponent {
  static propTypes = {
    claim: PropTypes.object.isRequired,
    link: PropTypes.bool,
    uri: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
    isResolvingUri: PropTypes.bool,
  };

  static defaultProps = {
    link: false,
    isResolvingUri: false,
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
    const { claim, link, isResolvingUri } = this.props;

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
      channelLink = link ? buildURI({ channelName, claimId: channelClaimId }, false) : false;
    } else {
      icon = 'times-circle';
      modifier = 'invalid';
    }

    const inner = (
      <View>
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
      </View>
    );

    if (!channelLink) {
      return inner;
    }

    return (
      <Link
        navigate="/show"
        navigateParams={{ uri: channelLink }}
        className="no-underline"
        span={View}
      >
        {inner}
      </Link>
    );
  }
}

export default UriIndicator;
