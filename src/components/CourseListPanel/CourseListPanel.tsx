import * as cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Accordion, Checkbox } from 'semantic-ui-react';
import { ICourseTableCourse } from '../share';
import * as s from './CourseListPanel.css';
import * as COURSELISTQUERY from './CoursesListQuery.gql';

export interface ICourseList extends React.Props<any> {
  courses?: ICourseTableCourse[];
  loading: boolean;
  error: Error;
}

const messages = defineMessages({
  header: {
    id: 'sidebar.courselist.header',
    defaultMessage: 'Courses',
    description: 'List of courses in coursetable',
  },
  noCourse: {
    id: 'sidebar.courselist.nocourse',
    defaultMessage: 'No Course found.',
    description: 'No course found in coursetable',
  },
  addCourseNoResult: {
    id: 'sidebar.courselist.addcoursenoresult',
    defaultMessage: 'Add some?',
    description: 'Add courses in coursetable',
  },
});

const CourseItem = ({ courseID, name, sectionNo }) => (
  <div>
    <div className={s.header}>{courseID}</div>
    <div className={s.subHeader}>{name}</div>
    <div className={s.section}>{sectionNo}</div>
  </div>
);

const SectionItem = ({ index, teachers, timeIntervals, type, applied, onApply }) => (
  <div>
    <Checkbox value={`${index}`} checked={applied} onChange={onApply}/>
    #{index}
    <div>{teachers}</div>
    <div>
      {timeIntervals.map(({ day, start, end }) => (
        <div key={`day:start:end`}>{day} {start} - {end}</div>
      ))}
    </div>
    <div>{type}</div>
  </div>
);

const NoCourse = () => (
  <div>
    <FormattedMessage {...messages.noCourse} />
    <Link to="/search">
      <FormattedMessage {...messages.addCourseNoResult}/>
    </Link>
  </div>
);

class CourseList extends React.Component<ICourseList, void> {
  constructor(props) {
    super(props);

    this.handleApplySection = this.handleApplySection.bind(this);
  }

  private handleApplySection(e, { value }) {
    this.setState({ value });
  }

  public render() {
    const renderPanels = this.props.courses && this.props.courses.map((c) => ({
      key: `search-${c.course._id}`,
      title: (<CourseItem name={c.course.name} courseID={c.course.courseID} sectionNo={c.section.sectionNo}/>),
      content: (
        <div>
          {c.course.sections.edges.map(({ node }) => (
            <SectionItem
              key={node._id}
              index={node.sectionNo}
              applied={c.section._id === node._id}
              onApply={this.handleApplySection}
              {...node}
            />
          ))}
        </div>
      ),
    }));

    return (
      <div className={cx(s.root)}>
        <div className={s.header}><FormattedMessage {...messages.header} /></div>
        {this.props.loading ? <div className={s.loading}>loading...</div> :
          !this.props.courses ? <NoCourse /> :
            <Accordion panels={renderPanels} styled fluid />
        }
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  graphql(COURSELISTQUERY, {
    options(props) {
      return {
        variables: {
          coursetable: props.match.params.id,
        },
      };
    },
    props(props) {
      const { data: { me, error, loading } } = props;
      return {
        courses: me && me.coursetable && me.coursetable.courses,
        loading,
        error,
      };
    },
  }),
)(CourseList);
