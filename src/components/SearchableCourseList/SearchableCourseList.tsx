import * as cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Accordion, Button } from 'semantic-ui-react';
import * as s from './SearchableCourseList.css';
import * as SEARCHCOURSEQUERY from './SearchCourseQuery.gql';

// TODO use import
// tslint:disable-next-line:no-var-requires
const MdArrowBack = require('react-icons/lib/md/arrow-back');

const messages = defineMessages({
});

interface ISectionPage {
  edges: Array<{
    node: {
      timeIntervals: Array<{
        day: string,
        start: string,
        end: string,
      }>,
      teachers: Array<{
        abbreviated: string,
      }>,
      building: string,
      classroom: string,
      type: string,
    },
  }>;
}

interface ICourse {
  _id: string;
  courseID: string;
  name: string;

  sections: ISectionPage;
}

interface ISearchableCourseListProps extends React.Props<any> {
  text: string;
  courses: ICourse[];
  error: any;
  loading: boolean;
}

const CourseItem = ({ courseID, name }) => (
  <div>
    <div className={s.header}>{courseID}</div>
    <div className={s.subHeader}>{name}</div>
  </div>
);

const SectionItem = ({ index, teachers, timeIntervals, type }) => (
  <div>
    #{index}
    <div>{teachers}</div>
    <div>
      {timeIntervals.map(({ day, start, end }) => (
        <div key={`day:start:end`}>{day} {start} - {end}</div>
      ))}
    </div>
    <div>{type}</div>
    {/*<Button onClick={onClick}>Apply</Button>*/}
  </div>
);

class SearchableCourseList extends React.Component<ISearchableCourseListProps, void> {
  constructor(props) {
    super(props);
  }

  public render() {
    const renderPanels = this.props.courses && this.props.courses.map((c) => ({
      key: `search-${c._id}`,
      title: (<CourseItem name={c.name} courseID={c.courseID} />),
      content: (
        <div>
          {c.sections.edges.map((s, i) => (
            <SectionItem
              index={i}
              {...(s.node)}
            />
          ))}
        </div>
      ),
    }));

    return (
      <div className={cx(s.root)}>
        {this.props.courses && <Accordion panels={renderPanels} styled fluid />}
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
    const { data: { search, error, loading }, ...p } = props;
    return {
      search,
      error,
      loading,
      ...p,
    };
  },
})(SearchableCourseList));
