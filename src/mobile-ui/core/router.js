import React from 'react';
import { Platform } from 'react-native';
import { Route } from 'react-router-native';
import styled from 'styled-components/native';

import Test from '../page/test';
// import Discover from '../page/discover';

const Router = styled.View`
  top: ${Platform.OS === 'web' ? 0 : 58}px;
`;

class AppRouter extends React.PureComponent {
  render() {
    return (
      <Router>
        <Route key="/" exact path="/" component={Test} />
        {/*<Route key="/discover" path="/discover" component={Discover} />*/}
      </Router>
    );
  }
}

export default AppRouter;
