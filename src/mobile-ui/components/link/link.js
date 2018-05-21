/* eslint-disable react/prop-types */

import React from 'react';
import styled, { css } from 'styled-components';
import { Text, Platform, View } from 'components/core';
import Icon from 'components/icon';
// import TouchableHighlight from 'components/touchableHighlight';
import { TouchableOpacity } from 'react-native';
import theme from 'theme';
import RouterLink from './router-link';

const LabelText = styled(Text)`
  margin-right: ${theme.fontSize}px;
`;

class Link extends React.PureComponent {
  onClick = event => {
    const { navigate, navigateParams, doNavigate, onClick } = this.props;
    if (!onClick && navigate) {
      event.stopPropagation();
      doNavigate(navigate, navigateParams || {});
    } else if (onClick) {
      onClick(event);
    }
  };

  render() {
    const {
      label,
      icon,
      iconRight,
      component = TouchableOpacity,
      to,
      replace,
      doNavigate,
      onClick,
      ...props
    } = this.props;
    let { children } = this.props;

    // const combinedClassName =
    //   (className || '') +
    //   (!className && !button ? 'button-text' : '') + // Non-button links get the same look as text buttons
    //   (button ? ` button-block button-${button} button-set-item` : '') +
    //   (disabled ? ' disabled' : '');

    if (!children) {
      children = [
        icon ? <Icon key="icon" icon={icon} fixed /> : null,
        label ? <LabelText key="text">{label}</LabelText> : null,
        iconRight ? <Icon key="right-icon" icon={iconRight} fixed /> : null,
      ];
    }

    if (to) {
      const extraProps = Platform.OS === 'web' ? {} : { component };
      return (
        <RouterLink to={to} replace={replace} {...extraProps} {...props}>
          {children}
        </RouterLink>
      );
    }

    // eslint-disable-next-line no-console
    console.debug('falling back do old link api');
    return (
      <TouchableOpacity onPress={this.onClick} {...props}>
        <View {...props}>{children}</View>
      </TouchableOpacity>
    );

    // const linkProps = {
    //   className: combinedClassName,
    //   href: href || 'javascript:;', // eslint-disable-line no-script-url
    //   title,
    //   onClick,
    //   style,
    // };
  }
}

const osStyles = {
  web: css`
    cursor: pointer;
  `,
};

export default styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 3px;
  padding: ${props => props.padding || 0};
  ${osStyles[Platform.OS] || ''};
`;
