import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { AsyncCourseGroupPanel } from '../CourseGroupPanel';
import { AsyncCourseListPanel } from '../CourseListPanel';
import Main from '../Main';
import { AsyncSearchCoursePanel } from '../SearchCoursePanel';
import Sidebar from '../Sidebar';
import SidebarMenu from '../SidebarMenu';
import * as s from './Layout.css';
import NoMatch from './NoMatch';

// TODO not using required
// tslint:disable-next-line:no-var-requires
const MdAdd = require('react-icons/lib/md/add');

interface ILayoutProps extends React.Props<any> {
  children?: React.ReactNode;
  expand: {
    left: boolean,
    right: boolean,
  };
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
        <SidebarMenu key="sidebar-menu" expanded={this.props.expand.left} left></SidebarMenu>
        <Main expanded={this.props.expand}>
          {this.props.children}
        </Main>
        <Sidebar expanded={this.props.expand.right} right>
          <Switch>
            <Route exact path="/coursetable/:id" component={AsyncCourseListPanel} />
            <Route exact path="/coursetable/:id/search" component={AsyncSearchCoursePanel} />
            <Route exact path="/coursetable/:id/coursegroup/:gid" component={AsyncCourseGroupPanel} />
            <Route path="/" />
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
