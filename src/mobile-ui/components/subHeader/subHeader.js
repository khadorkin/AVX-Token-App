/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'components/core';
import Link from 'components/link';

class SubHeader extends React.PureComponent {
  static propTypes = {
    subLinks: PropTypes.arrayOf(PropTypes.string),
    currentPage: PropTypes.object,
  };

  static defaultProps = {
    subLinks: [],
    currentPage: undefined,
  };

  render() {
    const { subLinks, currentPage /* navigate, fullWidth, smallMargin*/ } = this.props;

    // onClick={event => navigate(`/${link}`, event)}
    const links = Object.keys(subLinks || []).map(link => (
      <Link
        to={link}
        key={link}
        className={link === currentPage ? 'sub-header-selected' : 'sub-header-unselected'}
      >
        {subLinks[link]}
      </Link>
    ));

    // className={classnames('sub-header', {
    //   'sub-header--full-width': fullWidth,
    //   'sub-header--small-margin': smallMargin,
    // })}

    return <View>{links}</View>;
  }
}

export default SubHeader;
