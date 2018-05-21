/* eslint-disable react/prop-types */

import React from 'react';
import { BusyMessage } from 'components/common';
// import SubHeader from 'components/subHeader';

import FeaturedCategory from 'components/featuredCategory';
import { ScrollView, Text } from 'components/core';

class DiscoverPage extends React.PureComponent {
  // componentWillMount() {
  //   // this.props.fetchFeaturedUris();
  // }

  render() {
    const { featuredUris, fetchingFeaturedUris } = this.props;
    const featureUriKeys = Object.keys(featuredUris);
    const hasContent = typeof featuredUris === 'object' && featureUriKeys.length;
    const failedToLoad = !fetchingFeaturedUris && !hasContent;

    // TODO: handle reloading
    /*<FeaturedCategory
      key={category}
      category={category}
      names={featuredUris[category]}
    />*/

    return (
      <ScrollView id="discover-scroll" contentContainerStyle={{ flexShrink: 0 }}>
        {/*<SubHeader fullWidth smallMargin />*/}
        {!hasContent && fetchingFeaturedUris && <BusyMessage message={__('Fetching content')} />}
        {hasContent &&
          featureUriKeys
            .slice(0, 3)
            .map(
              category =>
                featuredUris[category].length ? (
                  <FeaturedCategory
                    key={category}
                    category={category}
                    names={featuredUris[category]}
                  />
                ) : null
            )}
        {failedToLoad && <Text className="empty">{__('Failed to load landing content.')}</Text>}
      </ScrollView>
    );
  }
}

export default DiscoverPage;
