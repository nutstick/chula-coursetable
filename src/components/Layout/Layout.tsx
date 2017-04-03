import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import Main from '../Main';
import Sidebar from '../Sidebar';
import * as s from './Layout.css';

interface ILayoutProps extends React.Props<any> {}

class Layout extends React.Component<ILayoutProps, void> {
  public render() {
    return (
      <div>
        <Sidebar></Sidebar>
        <Main>
          {this.props.children}
        </Main>
      </div>
    );
  }
}

export default withStyles(s)(Layout);
