import React from 'react';
import { Link } from 'react-router-platform';
import { View } from 'components/core';

class RouterLink extends React.PureComponent {
  render() {
    // eslint-disable-next-line react/prop-types
    const { to, replace, component, children, ...props } = this.props;
    return (
      <Link to={to} replace={replace} component={component}>
        <View {...props}>{children}</View>
      </Link>
    );
  }
}
export default RouterLink;
