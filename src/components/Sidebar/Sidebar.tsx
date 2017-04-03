import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Button } from 'semantic-ui-react';
import Avartar from '../Avartar';
import * as logoUrl from './Logo-Black.png';
import * as s from './Sidebar.css';

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

class Sidebar extends React.Component<void, void> {
  render() {
    return (
      <div className={s.root}>
        <div className={s.wrap}>
          <div className={s.logoWrapper}>
            <img className={s.logo} src={logoUrl} srcSet={`${logoUrl}`} alt="ChulaCoursetable" />
          </div>
          <div className={s.menu}>
            <nav className={s.nav}>
              <a href="/"><FormattedMessage {...messages.coursetables} /></a>
              <a href="/search/"><FormattedMessage {...messages.search} /></a>
              <a href="/courses/"><FormattedMessage {...messages.courses} /></a>
            </nav>
          </div>
          <div className={s.profileWrapper}>
            <div className={s.profile}>
              <Avartar
                className={s.avatar}
                src="http://www.girardatlarge.com/wp-content/uploads/2013/05/gravatar-60-grey.jpg"
                alt="Cat"
                size={60}>
              </Avartar>
              <div className={s.nameWrapper}>
                <div className={s.firstLine}>Firstname</div>
                <div className={s.secondLine}>Eng, 5731035121</div>
              </div>
            </div>
            <div className={s.actionHolder}>
              <Button basic color="blue">Edit</Button>
              <Button basic color="blue">Sign out</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Sidebar);
