import React from 'react';
import { View } from 'components/core';
import { Redirect, Route, Switch, withRouter } from 'react-router-platform';

// import Test from '../page/test';
import Test2 from '../page/test2';
import Discover from '../page/discover';
import VideoDetail from '../page/video-detail';
import Wallet from '../page/wallet';

class AppRoutes extends React.PureComponent {
  render() {
    return (
      <View>
        <Switch>
          <Route key="/wallet" exact path="/wallet" component={Wallet} />
          <Route key="/subscriptions" exact path="/subscriptions" component={Test2} />
          <Route key="/discover" exact path="/discover" component={Discover} />
          <Route key="/show" exact path="/show" component={VideoDetail} />
          <Route key="/" exact path="/" render={() => <Redirect to="/discover" />} />
        </Switch>
      </View>
    );
  }
}

export default withRouter(AppRoutes);
