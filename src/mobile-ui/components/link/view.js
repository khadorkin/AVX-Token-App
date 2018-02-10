import React from 'react';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';
import Icon from 'components/icon';
import { ButtonContent } from 'components/button';
const A = View;

const LinkContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Link = props => {
  const {
    href,
    title,
    style,
    label,
    icon,
    iconRight,
    button,
    disabled,
    children,
    navigate,
    navigateParams,
    doNavigate,
    className,
    span,
  } = props;

  const combinedClassName =
    (className || '') +
    (!className && !button ? 'button-text' : '') + // Non-button links get the same look as text buttons
    (button ? ` button-block button-${button} button-set-item` : '') +
    (disabled ? ' disabled' : '');

  const onClick =
    !props.onClick && navigate
      ? event => {
          event.stopPropagation();
          doNavigate(navigate, navigateParams || {});
        }
      : props.onClick;

  let content;
  if (children) {
    content = children;
  } else {
    const Box = 'button' in props ? ButtonContent : LinkContent;
    content = (
      <Box>
        {icon ? <Icon icon={icon} fixed /> : null}
        {label ? <Text className="link-label">{label}</Text> : null}
        {iconRight ? <Icon icon={iconRight} fixed /> : null}
      </Box>
    );
  }

  const linkProps = {
    className: combinedClassName,
    href: href || 'javascript:;',
    title,
    onClick,
    style,
  };

  return span ? <View {...linkProps}>{content}</View> : <A {...linkProps}>{content}</A>;
};

export default Link;
