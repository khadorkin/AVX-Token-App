import React from 'react';
import { View } from 'components/core';
import Link from 'components/link';

const SubHeader = props => {
  const { subLinks, currentPage, navigate, fullWidth, smallMargin } = props;

  const links = Object.keys(subLinks || []).map(link => (
    <Link
      onClick={event => navigate(`/${link}`, event)}
      key={link}
      className={link == currentPage ? 'sub-header-selected' : 'sub-header-unselected'}
    >
      {subLinks[link]}
    </Link>
  ));

  // className={classnames('sub-header', {
  //   'sub-header--full-width': fullWidth,
  //   'sub-header--small-margin': smallMargin,
  // })}

  return <View>{links}</View>;
};

export default SubHeader;
