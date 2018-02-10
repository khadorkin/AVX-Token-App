import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import classnames from 'classnames';
import * as icons from 'constants/icon';

const ThemedIcon = styled(Icon)`
  color: ${props => props.theme.defaultTextColor};
  text-align: center;
  margin-right: 7px;
  margin-left: 7px;
`;

export default class IconComponent extends React.PureComponent {
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
    const iconClass = this.getIconClass();
    const title = this.getIconTitle();

    const spanClassName = classnames(
      'icon',
      iconClass,
      {
        'fixed-width': fixed,
        '-left-pad': leftPad,
      },
      className
    );

    return <ThemedIcon name={icon} className={className} title={title} />;
  }
}
