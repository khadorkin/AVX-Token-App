/* eslint-disable react/prop-types */

import React from 'react';
import styled, { css } from 'styled-components';
import { Text, Platform } from 'react-native';
import Icon from 'components/icon';
import { ButtonContent } from 'components/button';
import TouchableHighlight from 'components/touchableHighlight';

const LinkContent = styled(TouchableHighlight)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

class Link extends React.PureComponent {
  onClick = event => {
    const { navigate, navigateParams, doNavigate, onClick } = this.props;
    if (!onClick && navigate) {
      event.stopPropagation();
      doNavigate(navigate, navigateParams || {});
    } else {
      onClick(event);
    }
  };

  render() {
    const {
      href,
      title,
      style,
      label,
      icon,
      iconRight,
      button,
      // disabled,
      // className,
      // span,
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
        label ? (
          <Text key="text" className="link-label">
            {label}
          </Text>
        ) : null,
        iconRight ? <Icon key="right-icon" icon={iconRight} fixed /> : null,
      ];
    }

    const Box = button ? ButtonContent : LinkContent;
    return (
      <Box style={style} onClick={this.onClick} title={title} href={href}>
        {children}
      </Box>
    );
    // return (
    //   <Box onClick={this.onClick}>
    //     <Text>{title}</Text>
    //   </Box>
    // );

    // const linkProps = {
    //   className: combinedClassName,
    //   href: href || 'javascript:;', // eslint-disable-line no-script-url
    //   title,
    //   onClick,
    //   style,
    // };

    // return span ? <View {...linkProps}>{content}</View> : <A {...linkProps}>{content}</A>;
  }
}

const osStyles = {
  web: css`
    cursor: pointer;
  `,
};

export default styled(Link)`
  flex-direction: row;
  align-items: center;
  border-radius: 3px;
  padding: ${props => props.padding || 0};
  ${osStyles[Platform.OS] || ''};
`;
