import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { AsyncCourseListPanel } from '../CourseListPanel';
import Main from '../Main';
import { AsyncSearchCoursePanel } from '../SearchCoursePanel';
import Sidebar from '../Sidebar';
import SidebarMenu from '../SidebarMenu';
import * as s from './Layout.css';

// TODO not using required
// tslint:disable-next-line:no-var-requires
const MdAdd = require('react-icons/lib/md/add');

interface ILayoutProps extends React.Props<any> {
  children?: React.ReactNode;
  expand: string;
  floatingButton: {
    show: boolean,
    to?: string,
    icon?: string,
  };
}

class Layout extends React.Component<ILayoutProps, void> {
  public render() {
    return (
      <div>
        <SidebarMenu expanded={this.props.expand === 'left' ||  this.props.expand === 'both'} left></SidebarMenu>
        <Main expanded={this.props.expand}>
          {this.props.children}
        </Main>
        <Sidebar expanded={this.props.expand === 'right' || this.props.expand === 'both'} right>
          <Switch>
            <Route exact path="/coursetable/:id" component={AsyncCourseListPanel} />
            <Route exact path="/coursetable/:id/search" component={AsyncSearchCoursePanel} />
          </Switch>
        </Sidebar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expand: state.ui.sidebar.expand,
  floatingButton: state.ui.floatingButton,
});

export default withStyles(s)(connect(mapStateToProps)(Layout));
