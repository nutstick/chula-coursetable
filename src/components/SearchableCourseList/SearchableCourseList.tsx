import * as cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { defineMessages, FormattedMessage } from 'react-intl';
import { IFullCourse } from '../CourseTable';
import * as s from './SearchableCourseList.css';
import * as SEARCHCOURSEQUERY from './SearchCourseQuery.gql';
import { Accordion } from 'semantic-ui-react'
import { List, Item } from '../List';

// TODO use import
// tslint:disable-next-line:no-var-requires
const MdArrowBack = require('react-icons/lib/md/arrow-back');

const messages = defineMessages({
});

interface ICourse {
  _id: string;
  courseID: string;
  name: string;
  shortName: string;

  sections: any;
}

interface ISearchableCourseListProps extends React.Props<any> {
  text: string;
  courses: ICourse[];
  error: any;
  loading: boolean;
}

class SearchableCourseList extends React.Component<ISearchableCourseListProps, void> {
  constructor(props) {
    super(props);
  }

  public render() {
    const renderPanels = this.props.courses && this.props.courses.map((c) => ({
      key: `search-${c._id}`,
      title: (<List />),
      content: (
        <Message
          info
          header={faker.lorem.sentence()}
          content={faker.lorem.paragraph()}
        />
      ),
    }))
    return (
      <div className={cx(s.root)}>
        {this.props.courses && <Accordion panels={renderPanels} styled />}
        {!this.props.courses && this.props.text && (
          <div>No results</div>
        )}
        {!this.props.courses && !this.props.text && (
          <div>Type to search...</div>
        )}
      </div>
    );
  }
}
export default withStyles(s)(graphql(SEARCHCOURSEQUERY, {
  options: ({ text }) => {
    return {
      variables: {
        search: text,
      },
    };
  },
  props(props) {
    const { data: { courses, error, loading }, ...p } = props;
    return {
      courses,
      error,
      loading,
      ...p,
    };
  },
})(SearchableCourseList));
