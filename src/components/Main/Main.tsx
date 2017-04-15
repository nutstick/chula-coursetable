import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import * as s from './Main.css';

class Main extends React.Component<any, any> {
  public render() {
    return (
      <div className={s.root}>
        {this.props.children}
      </div>
    );
  }
}

export default withStyles(s)(Main);
