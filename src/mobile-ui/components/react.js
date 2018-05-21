import React from 'react';

export class StateComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const shouldUpdate = this.state !== nextState || this.props !== nextProps;
    // eslint-disable-next-line no-console
    console.debug(`${this.constructor.name}.shouldComponentUpdate`, shouldUpdate);
    return shouldUpdate;
  }
}
