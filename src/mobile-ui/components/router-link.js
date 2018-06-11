/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-children-prop */
/* eslint-disable no-shadow */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-platform';
import { View } from 'react-native';

/**
 * A <Link> wrapper that knows if it's "active" or not.
 */
const RouterLink = ({
  to,
  exact,
  strict,
  location,
  activeClassName,
  className,
  activeStyle,
  style,
  textStyle,
  activeTextStyle,
  isActive: getIsActive,
  'aria-current': ariaCurrent,
  component = View,
  ...rest
}) => {
  const path = typeof to === 'object' ? to.pathname : to;
  const Component = component;

  // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
  const escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');

  return (
    <Route
      path={escapedPath}
      exact={exact}
      strict={strict}
      location={location}
      children={({ location, match }) => {
        const isActive = !!(getIsActive ? getIsActive(match, location) : match);
        return (
          <Component
            to={to}
            style={isActive && activeStyle ? [style, activeStyle] : style}
            aria-current={(isActive && ariaCurrent) || null}
            textStyle={isActive && activeTextStyle ? [textStyle, activeTextStyle] : textStyle}
            {...rest}
          />
        );
      }}
    />
  );
};

RouterLink.propTypes = {
  to: Link.propTypes.to,
  exact: PropTypes.bool,
  strict: PropTypes.bool,
  location: PropTypes.object,
  activeClassName: PropTypes.string,
  className: PropTypes.string,
  activeStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  isActive: PropTypes.func,
  'aria-current': PropTypes.oneOf(['page', 'step', 'location', 'date', 'time', 'true']),
  component: PropTypes.any,
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  activeTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};

RouterLink.defaultProps = {
  activeClassName: 'active',
  'aria-current': 'page',
};

export default connect(state => ({
  location: state.router.location,
}))(RouterLink);
