import React from 'react';
import { Platform, View } from 'components/core';
import { Route, Switch, withRouter } from 'react-router-platform';

import Test from '../page/test';
import Test2 from '../page/test2';
import Discover from '../page/discover';

class AppRoutes extends React.PureComponent {
  render() {
    return (
      <View>
        <Switch>
          <Route key="/" exact path="/" component={Test} />
          <Route key="/discover" path="/discover" component={Discover} />
          <Route key="/subscriptions" path="/subscriptions" component={Test2} />
        </Switch>
      </View>
    );
  }
}

export default withRouter(AppRoutes);
