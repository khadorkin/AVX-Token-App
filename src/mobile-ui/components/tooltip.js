import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'components/core';
import TouchableHighlight from 'components/touchableHighlight';

export class ToolTip extends React.PureComponent {
  static propTypes = {
    body: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      showTooltip: false,
    };
  }

  handleClick() {
    this.setState({
      showTooltip: !this.state.showTooltip,
    });
  }

  handleTooltipMouseOut() {
    this.setState({
      showTooltip: false,
    });
  }

  render() {
    return (
      <View className={`tooltip ${this.props.className || ''}`}>
        <TouchableHighlight
          className="tooltip__link"
          onClick={() => {
            this.handleClick();
          }}
        >
          <Text>{this.props.label}</Text>
        </TouchableHighlight>
        <Text
          className={`tooltip__body ${this.state.showTooltip ? '' : ' hidden'}`}
          onMouseOut={() => {
            this.handleTooltipMouseOut();
          }}
        >
          {this.props.body}
        </Text>
      </View>
    );
  }
}

export default ToolTip;
