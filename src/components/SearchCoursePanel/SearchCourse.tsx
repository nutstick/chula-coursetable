import * as cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Button, Input } from 'semantic-ui-react';
import SearchableCourseList from '../SearchableCourseList';
import { rightSidebarExpand } from '../../redux/ui/actions';
import * as s from './SearchCourse.css';

// TODO use import
// tslint:disable-next-line:no-var-requires
const MdArrowBack = require('react-icons/lib/md/arrow-back');

const messages = defineMessages({
  courseHeader: {
    id: 'searchcourse.header',
    defaultMessage: 'Courses',
    description: 'Courses',
  },
  searchInput: {
    id: 'searchcourse.input',
    defaultMessage: 'Type to search',
    description: 'My Course tables menu',
  },
});

interface ISearchCourseProps extends React.Props<any> {
  search: string;
}

interface ISearchCourseState {
  text: string;
}

class SearchCourse extends React.Component<ISearchCourseProps, ISearchCourseState> {
  constructor(props, context) {
    super(props);
    this.state = {
      text: '',
    };
  }

  private onSearch(e, data) {
    this.setState({ text: data.value });
  }

  public render() {
    return (
      <div className={cx(s.root)}>
        <div className={s.wrap}>
          <div className={s.header}>
            <a href="#" className={s.back}>
              <MdArrowBack size={24}></MdArrowBack>
            </a>
            <p><FormattedMessage {...messages.courseHeader} /></p>
          </div>
          <div className={s.header}>
            <Input
              action={{ icon: 'search' }}
              placeholder="Search..." size="small"
              onChange={this.onSearch.bind(this)}
            />
          </div>
          <SearchableCourseList text={this.state.text} />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(SearchCourse);
