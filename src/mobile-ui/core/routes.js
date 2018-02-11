import React from 'react';
import { Platform } from 'react-native';
import { Route, Switch } from 'react-router-platform';
import styled from 'styled-components';

import Test from '../page/test';
import Test2 from '../page/test2';
// import Discover from '../page/discover';

const Routes = styled.View`
  top: ${Platform.OS === 'web' ? 0 : 58}px;
`;

class AppRoutes extends React.Component {
  render() {
    return (
      <Routes>
        <Switch>
          <Route key="/" exact path="/" component={Test} />
          {/*<Route key="/discover" path="/discover" component={Discover} />*/}
          <Route key="/test2" path="/test2" component={Test2} />
        </Switch>
      </Routes>
    );
  }
}

export default AppRoutes;
