import * as cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Button, Input } from 'semantic-ui-react';
import { rightSidebarExpand } from '../../redux/ui/actions';
import * as s from './SearchCourse.css';
import * as SEARCHCOURSEQUERY from './SearchCourseQuery.gql';

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

interface ISearchCourse extends React.Props<any> {
  search: string;
}

class SearchCourse extends React.Component<ISearchCourse, void> {
  constructor(props, context) {
    super(props);
  }

  private onSearch(e, data) {
    console.log(data);
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
        </div>
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  graphql(SEARCHCOURSEQUERY, {
    options(ownProps) {
      console.log(ownProps);
      return {
        variables: {
          search: ownProps.search,
        },
      };
    },
  }),
)(SearchCourse);
