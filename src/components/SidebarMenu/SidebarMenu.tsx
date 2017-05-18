import * as cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { defineMessages, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as Redux from 'redux';
import { Button } from 'semantic-ui-react';
import { IState } from '../../redux/IState';
import Avartar from '../Avartar';
import { ISidebarProps } from '../Sidebar';
import Sidebar from '../Sidebar';
import * as logoUrl from './Logo-Black.png';
import * as s from './SidebarMenu.css';
import * as USERQUERY from './UserQuery.gql';

interface IConnectedDispatch {
  onSignOut?: () => void;
}

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
  newsfeed: {
    id: 'sidebar.menu.newsfeed',
    defaultMessage: 'Feed',
    description: 'New feeds',
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
      <Sidebar className={s.root} {...this.props}>
        <div className={s.wrap}>
          <div className={s.logoWrapper}>
            <img className={s.logo} src={logoUrl} srcSet={`${logoUrl}`} alt="ChulaCoursetable" />
          </div>
          <div className={s.menu}>
            <nav className={s.nav}>
              <NavLink to="/" activeClassName={s.active}><FormattedMessage {...messages.newsfeed} /></NavLink>
              <NavLink to="/coursetable" activeClassName={s.active}>
                <FormattedMessage {...messages.coursetables} />
              </NavLink>
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
              <Button basic color="blue" onClick={this.props.signOut.bind(this)}>Sign out</Button>
            </div>
          </div>
        </div>
      </Sidebar>
    );
  }
}

const mapDispatchToProps = (dispatch: Redux.Dispatch<IState>): IConnectedDispatch => {
  return {
    onAddCourseActionTrigger: (coursetable, course, target) => {
      const self: any = this;
      dispatch(pushAddCourseAction(coursetable, course, target));
    },
  };
};

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
