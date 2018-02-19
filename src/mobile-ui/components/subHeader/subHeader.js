/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'components/core';
import Link from 'components/link';

class SubHeader extends React.PureComponent {
  static propTypes = {
    subLinks: PropTypes.arrayOf(PropTypes.string),
    currentPage: PropTypes.object,
    navigate: PropTypes.func,
  };

  static defaultProps = {
    subLinks: [],
    currentPage: undefined,
    navigate: undefined,
  };

  render() {
    const { subLinks, currentPage, navigate /*, fullWidth, smallMargin*/ } = this.props;

    const links = Object.keys(subLinks || []).map(link => (
      <Link
        onClick={event => navigate(`/${link}`, event)}
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
