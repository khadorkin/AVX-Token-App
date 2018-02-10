/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-multi-comp */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-string-refs */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, View } from 'components/core';
import { formatCredits, formatFullPrice } from 'utils/formatCredits';
import theme from 'theme';

// import lbry from '../lbry.js';

// const viewStyle = {
//   WebkitLineClamp: props.lines,
// };

export const TruncatedText = styled(Text)`
  line-height: ${theme.fontSize * theme.fontLineHeight}px;
  height: ${theme.fontSize * theme.fontLineHeight}px;
  overflow: hidden;
`;
// export class TruncatedText extends React.PureComponent {
//   static propTypes = {
//     // lines: PropTypes.number,
//     children: PropTypes.any, // eslint-disable-line react/forbid-prop-types
//   };

//   static defaultProps = {
//     // lines: null,
//     children: null,
//   };

//   render() {
//     return <Text className="truncated-text">{this.props.children}</Text>;
//   }
// }

export class BusyMessage extends React.PureComponent {
  static propTypes = {
    message: PropTypes.string,
  };

  static defaultProps = {
    message: '',
  };

  render() {
    return (
      <View>
        <Text>{this.props.message}</Text>
        <View className="busy-indicator" />
      </View>
    );
  }
}

export class CurrencySymbol extends React.PureComponent {
  render() {
    return <Text>LBC</Text>;
  }
}

export class CreditAmount extends React.PureComponent {
  static propTypes = {
    amount: PropTypes.number.isRequired,
    precision: PropTypes.number,
    isEstimate: PropTypes.bool,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    showFree: PropTypes.bool,
    showFullPrice: PropTypes.bool,
    showPlus: PropTypes.bool,
    look: PropTypes.oneOf(['indicator', 'plain', 'fee']),
  };

  static defaultProps = {
    precision: 2,
    label: true,
    showFree: false,
    look: 'indicator',
    showFullPrice: false,
    showPlus: false,
    isEstimate: false,
  };

  render() {
    const minimumRenderableAmount = 10 ** (-1 * this.props.precision);
    const { amount, precision, showFullPrice } = this.props;

    let formattedAmount;
    const fullPrice = formatFullPrice(amount, 2);

    if (showFullPrice) {
      formattedAmount = fullPrice;
    } else {
      formattedAmount =
        amount > 0 && amount < minimumRenderableAmount
          ? `<${minimumRenderableAmount}`
          : formatCredits(amount, precision);
    }

    let amountText;
    if (this.props.showFree && parseFloat(this.props.amount) === 0) {
      amountText = __('free');
    } else {
      if (this.props.label) {
        let { props: label } = this;
        if (typeof this.props.label !== 'string') {
          label = parseFloat(amount) === 1 ? __('credit') : __('credits');
        }

        amountText = `${formattedAmount} ${label}`;
      } else {
        amountText = formattedAmount;
      }
      if (this.props.showPlus && amount > 0) {
        amountText = `+${amountText}`;
      }
    }

    return (
      <View className={`credit-amount credit-amount--${this.props.look}`} title={fullPrice}>
        <Text>{amountText}</Text>
        {this.props.isEstimate ? (
          <Text
            className="credit-amount__estimate"
            title={__('This is an estimate and does not include data fees')}
          >
            *
          </Text>
        ) : null}
      </View>
    );
  }
}

export class Thumbnail extends React.PureComponent {
  static propTypes = {
    src: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    src: '',
    className: '',
  };

  constructor(props) {
    super(props);

    // this._defaultImageUri = lbry.imagePath('default-thumb.svg');
    this._maxLoadTime = 10000;
    this._isMounted = false;

    this.state = {
      imageUri: this.props.src || '', //this._defaultImageUri,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    setTimeout(() => {
      if (this._isMounted && !this.refs.img.complete) {
        this.setState({
          imageUri: this._defaultImageUri,
        });
      }
    }, this._maxLoadTime);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleError() {
    if (this.state.imageUrl !== this._defaultImageUri) {
      this.setState({
        imageUri: this._defaultImageUri,
      });
    }
  }

  render() {
    const className = this.props.className ? this.props.className : '';
    const otherProps = Object.assign({}, this.props);
    delete otherProps.className;
    return (
      <img
        ref="img"
        alt=""
        onError={() => {
          this.handleError();
        }}
        {...otherProps}
        className={className}
        src={this.state.imageUri}
      />
    );
  }
}
