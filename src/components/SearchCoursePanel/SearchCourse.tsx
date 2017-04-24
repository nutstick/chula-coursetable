import * as cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Button, Input } from 'semantic-ui-react';
import { rightSidebarExpand } from '../../redux/ui/actions';
import SearchableCourseList from '../SearchableCourseList';
import * as s from './SearchCourse.css';

// TODO use import
// tslint:disable-next-line:no-var-requires
const MdArrowBack = require('react-icons/lib/md/arrow-back');

const messages = defineMessages({
  courseHeader: {
    id: 'searchcourse.header',
    defaultMessage: 'Search course',
    description: 'Search course',
  },
  searchInput: {
    id: 'searchcourse.input',
    defaultMessage: 'Type to search',
    description: 'Type search text to search field',
  },
});

interface ISearchCourseProps extends React.Props<any> {
  search: string;
  match: {
    params: {
      id: string,
    },
  };
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
            <Link to={`/coursetable/${this.props.match.params.id}`} className={s.back}>
              <MdArrowBack size={24}></MdArrowBack>
            </Link>
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
