import React from 'react';
import { connect } from 'react-redux';
// import ReactModal from 'react-modal';
import Header from 'components/header';
import styled from 'styled-components';
import { Redirect, Route, Switch } from 'react-router-platform';
import theme from 'theme';
import AsyncComponent from './AsyncComponent';

const Wallet = AsyncComponent(() => import('../../screens/wallet/Wallet'));
const Preferences = AsyncComponent(() => import('../../screens/prefs/Preferences'));
const Test2 = AsyncComponent(() => import('../../page/test2'));
const Discover = AsyncComponent(() => import('../../page/discover'));
const VideoDetail = AsyncComponent(() => import('../../screens/videos/Detail'));
const VideoPlayer = AsyncComponent(() => import('../../page/video-player'));
const Video = AsyncComponent(() => import('../../screens/videos/web/List'));

const AppView = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${theme.backgroundColor};
`;

class App extends React.PureComponent {
  componentDidCatch(error, errorInfo) {
    console.error(error); // eslint-disable-line no-console
    console.error(errorInfo); // eslint-disable-line no-console
  }

  render() {
    return (
      <AppView>
        <Header key="header" />
        <Switch>
          <Route key="/wallet" exact path="/wallet" component={Wallet} />
          <Route key="/preferences" exact path="/preferences" component={Preferences} />
          <Route key="/subscriptions" exact path="/subscriptions" component={Test2} />
          <Route key="/discover" exact path="/discover" component={Discover} />
          <Route key="/video" exact path="/video" component={Video} />
          <Route key="/video/:movieId" exact path="/video/:movieId" component={VideoDetail} />
          <Route key="/player/:infoHash" exact path="/player/:infoHash" component={VideoPlayer} />
          <Route key="/" exact path="/" render={() => <Redirect to="/video" />} />
        </Switch>
      </AppView>
    );
    // <ModalRouter />,
  }
}

export default connect(state => ({
  location: state.router.location,
}))(App);
