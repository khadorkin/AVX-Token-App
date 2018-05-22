import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
// export const Video = ({ source = {}, props }) => <video src={source.uri} {...props} />; // eslint-disable-line jsx-a11y/media-has-caption

export class Video extends React.PureComponent {
  static propTypes = {
    source: PropTypes.shape({
      uri: PropTypes.string.isRequired,
    }).isRequired,
  };
  render() {
    const { source = {}, ...props } = this.props;
    // eslint-disable-next-line jsx-a11y/media-has-caption
    return <video src={source.uri} {...props} />;
  }
}
