import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-platform';

// import Test from '../page/test';
import Test2 from '../page/test2';
import Discover from '../page/discover';
import VideoDetail from '../page/video-detail';
import VideoPlayer from '../page/video-player';
import Wallet from '../page/wallet';

class AppRoutes extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route key="/wallet" exact path="/wallet" component={Wallet} />
        <Route key="/subscriptions" exact path="/subscriptions" component={Test2} />
        <Route key="/discover" exact path="/discover" component={Discover} />
        <Route key="/video" exact path="/video/:infoHash" component={VideoDetail} />
        <Route key="/player" exact path="/player/:infoHash" component={VideoPlayer} />
        <Route key="/" exact path="/" render={() => <Redirect to="/discover" />} />
      </Switch>
    );
  }
}

export default withRouter(AppRoutes);
