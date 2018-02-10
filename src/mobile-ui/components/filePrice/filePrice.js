import React from 'react';
import { Text } from 'components/core';
import { CreditAmount } from 'components/common';

class FilePrice extends React.PureComponent {
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
    const { costInfo, look = 'indicator', showFullPrice = false } = this.props;

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
