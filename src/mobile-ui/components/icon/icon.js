import React from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'components/core';
import styledNative from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as icons from 'constants/icon';
import theme from 'theme';

const size = '40px';

const platformStyles = {
  web: `
  user-select: none;
`,
};

const StyledIcon = (Icon.extend || styledNative(Icon))`
  color: ${theme.defaultTextColor};
  text-align: center;
  flex-shrink: 0;
  flex-grow: 0;
  max-height: ${size};
  max-width: ${size};
  min-width: ${size};
  min-height: ${size};
  line-height: ${size};
  justify-content: center;
  align-items: center;
  ${platformStyles[Platform.OS] || ''}
`;

export default class IconComponentImpl extends React.PureComponent {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    fixed: PropTypes.bool,
    className: PropTypes.string,
    leftPad: PropTypes.bool,
  };

  static defaultProps = {
    fixed: false,
    className: '',
    leftPad: false,
  };

  getIconClass() {
    const { icon } = this.props;

    return icon.startsWith('') ? icon : `${icon}`;
  }

  getIconTitle() {
    switch (this.props.icon) {
      case icons.FEATURED:
        return __('Watch this and earn rewards.');
      case icons.LOCAL:
        return __('You have a copy of this file.');
      default:
        return '';
    }
  }

  render() {
    const { fixed, className, leftPad, icon } = this.props;
    // const iconClass = this.getIconClass();
    const title = this.getIconTitle();

    return (
      <StyledIcon
        name={icon}
        className={className}
        title={title}
        data-fixed={fixed}
        data-left-pad={leftPad}
      />
    );
  }
}

Object.assign(IconComponentImpl, icons);
