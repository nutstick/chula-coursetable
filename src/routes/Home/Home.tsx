import * as cx from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import LandingPage from '../LandingPage';
import NewsFeed from '../NewsFeed';

interface IHome extends React.Props<any> {
  user: string;
}

class Home extends React.Component<IHome, void> {
  public render() {
    if (!this.props.user) {
      return (<Route exact path="/" component={LandingPage} />);
    }
    return (<Route exact path="/" component={NewsFeed} />);
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.user._id,
});

export default connect(mapStateToProps)(Home);

