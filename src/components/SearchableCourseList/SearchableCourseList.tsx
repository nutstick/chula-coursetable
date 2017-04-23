import * as cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { defineMessages, FormattedMessage } from 'react-intl';
import { IFullCourse } from '../CourseTable';
import * as s from './SearchableCourseList.css';
import * as SEARCHCOURSEQUERY from './SearchCourseQuery.gql';
import { Accordion, Button } from 'semantic-ui-react'

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

  sections: any[];
}

interface ISearchableCourseListProps extends React.Props<any> {
  text: string;
  courses: ICourse[];
  error: any;
  loading: boolean;
}

const CourseItem = ({ name, shortName}) => (
  <div>
    <div className={s.header}>{shortName}</div>
    <div className={s.subHeader}>{name}</div>
  </div>
);

const SectionItem = ({ index, teachers, timeInterval, type, onClick }) => (
  <div>
    #{index}
    <div>{teachers}</div>
    <div>{timeInterval}</div>
    <div>{type}</div>
    <Button onClick={onClick}>Apply</Button>
  </div>
)

class SearchableCourseList extends React.Component<ISearchableCourseListProps, void> {
  constructor(props) {
    super(props);
  }

  public render() {
    const renderPanels = this.props.courses && this.props.courses.map((c) => ({
      key: `search-${c._id}`,
      title: (<CourseItem name={c.name} shortName={c.shortName} />),
      content: (
        <div>
          {c.sections.map((s, i) => (
            <SectionItem
              index={i}
              {...s}
            />
          ))}
        </div>
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
