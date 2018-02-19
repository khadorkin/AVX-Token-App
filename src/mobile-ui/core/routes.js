import React from 'react';
import { View } from 'components/core';
import { Redirect, Route, Switch, withRouter } from 'react-router-platform';

// import Test from '../page/test';
import Test2 from '../page/test2';
import Discover from '../page/discover';

class AppRoutes extends React.PureComponent {
  render() {
    return (
      <View>
        <Switch>
          <Route key="/wallet" exact path="/wallet" component={Test2} />
          <Route key="/subscriptions" exact path="/subscriptions" component={Test2} />
          <Route key="/discover" exact path="/discover" component={Discover} />
          <Route key="/" exact path="/" render={() => <Redirect to="/discover" />} />
        </Switch>
      </View>
    );
  }
}

export default withRouter(AppRoutes);
