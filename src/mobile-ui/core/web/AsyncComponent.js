import React from 'react';
import { StateComponent } from 'components/react';

const AsyncComponent = asyncImport =>
  class extends StateComponent {
    state = {
      component: null,
    };

    componentDidMount() {
      this.loadComponent();
    }

    async loadComponent() {
      try {
        const cmp = await asyncImport();
        this.setState({ component: cmp.default });
      } catch (e) {
        console.error(e); // eslint-disable-line no-console
      }
    }

    render() {
      const Component = this.state.component;
      return Component ? <Component {...this.props} /> : null;
    }
  };

export default AsyncComponent;
