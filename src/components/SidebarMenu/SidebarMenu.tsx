import * as cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { defineMessages, FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import Avartar from '../Avartar';
import Sidebar from '../Sidebar';
import { ISidebarProps } from '../Sidebar';
import * as logoUrl from './Logo-Black.png';
import * as s from './SidebarMenu.css';
import * as USERQUERY from './UserQuery.gql';

interface ISidebarMenuProps extends ISidebarProps {
  name: string;
  avatar: string;
  faculty: string;
  department: string;
  enrollYear: string;
}

const messages = defineMessages({
  coursetables: {
    id: 'sidebar.menu.coursetables',
    defaultMessage: 'Course Tables',
    description: 'My Course tables menu',
  },
  search: {
    id: 'sidebar.menu.search',
    defaultMessage: 'Search',
    description: 'Search menu',
  },
  courses: {
    id: 'sidebar.menu.courses',
    defaultMessage: 'My Courses',
    description: 'My Courses Menu',
  },
});

class SidebarMenu extends React.Component<ISidebarMenuProps, void> {
  public render() {
    return (
      <Sidebar {...this.props}>
        <div className={s.wrap}>
          <div className={s.logoWrapper}>
            <img className={s.logo} src={logoUrl} srcSet={`${logoUrl}`} alt="ChulaCoursetable" />
          </div>
          <div className={s.menu}>
            <nav className={s.nav}>
              <NavLink to="/" activeClassName={s.active}><FormattedMessage {...messages.coursetables} /></NavLink>
              <NavLink to="/search" activeClassName={s.active}><FormattedMessage {...messages.search} /></NavLink>
              <NavLink to="/courses" activeClassName={s.active}><FormattedMessage {...messages.courses} /></NavLink>
            </nav>
          </div>
          <div className={s.profileWrapper}>
            <div className={s.profile}>
              <Avartar
                className={s.avatar}
                src={`${this.props.avatar}`}
                alt="Cat"
                size={60}>
              </Avartar>
              <div className={s.nameWrapper}>
                <div className={s.firstLine}>{this.props.name}</div>
                <div className={s.secondLine}>{this.props.faculty}, {this.props.department}</div>
              </div>
            </div>
            <div className={s.actionHolder}>
              <Button basic color="blue">Edit</Button>
              <Button basic color="blue">Sign out</Button>
            </div>
          </div>
        </div>
      </Sidebar>
    );
  }
}

export default withStyles(s)(compose(
  graphql(USERQUERY, {
    props(props) {
      const { data: { me, error, loading } } = props;
      return {
        error,
        loading,
        ...me,
      };
    },
  }),
)(SidebarMenu));
