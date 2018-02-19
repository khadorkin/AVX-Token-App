/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import { Text } from 'components/core';
import { CreditAmount } from 'components/common';

class FilePrice extends React.PureComponent {
  static propTypes = {
    costInfo: PropTypes.object.isRequired,
    showFullPrice: PropTypes.bool,
    look: PropTypes.string,
  };

  static defaultProps = {
    look: 'indicator',
    showFullPrice: false,
  };

  componentWillMount() {
    this.fetchCost(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchCost(nextProps);
  }

  fetchCost(props) {
    const { costInfo, fetchCostInfo, uri, fetching, claim } = props;

    if (costInfo === undefined && !fetching && claim) {
      fetchCostInfo(uri);
    }
  }

  render() {
    const { costInfo, look, showFullPrice } = this.props;

    const isEstimate = costInfo ? !costInfo.includesData : null;

    if (!costInfo) {
      return <Text className={`credit-amount credit-amount--${look}`}>???</Text>;
    }

    return (
      <CreditAmount
        label={false}
        amount={costInfo.cost}
        isEstimate={isEstimate}
        showFree
        showFullPrice={showFullPrice}
      />
    );
  }
}

export default FilePrice;
