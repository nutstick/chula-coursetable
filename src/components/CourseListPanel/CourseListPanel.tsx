import * as cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Accordion, Checkbox, Label } from 'semantic-ui-react';
import { IAction, ICourseTableCourse } from '../share';
import * as s from './CourseListPanel.css';
import * as COURSELISTQUERY from './CoursesListQuery.gql';

export interface ICourseList extends React.Props<any> {
  courses?: ICourseTableCourse[];
  loading: boolean;
  error: Error;
  match: {
    params: {
      id: string,
    },
  };
}

interface IConnectionState {
  actions?: IAction[];
}

interface IConnectedDispatch {
  onChangeSectionActionTrigger?: (e) => void;
  onRemoveCourseActionTrigger?: (e) => void;
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
  addCourse: {
    id: 'sidebar.courselist.addcourse',
    defaultMessage: 'Add course',
    description: 'Add course',
  },
});

const mapStateToProps = (state: IState): IConnectionState => ({});

const mapDispatchToProps = (dispatch: redux.Dispatch<IState>): IConnectedDispatch => {
  return {
    onSetSidebarRight: (e) => {
      dispatch(rightSidebarExpand());
    },
  };
};

const CourseItem = ({ courseID, name, sectionNo }) => (
  <div className={s.courseItem}>
    <div className={s.header}>{courseID}</div>
    <div className={s.subHeader}>{name}</div>
    <div className={s.section}>{sectionNo}</div>
  </div>
);

const SectionItem = ({ index, teachers, timeIntervals, type, applied, onApply }) => {
  const colorType = type === 'gened' ? 'teal' : type === 'approved' ? 'red' : null;
  return (<div className={s.sectionItem}>
    <Checkbox className={s.checkBox} radio value={`${index}`} checked={applied} onChange={onApply} />
    <div className={s.sectionContent}>
      <div>
        <h4 className={s.sectionNo}>#{index}</h4>
        <span>{teachers && `Teacher: ${teachers}`}</span>
        <span>
          {timeIntervals.map(({ day, start, end }) => (
            <span key={`day:start:end`}>{day} {start} - {end}</span>
          ))}
        </span>
      </div>
      <Label className={s.tags} as="a" tag color={colorType} size="mini">{type}</Label>
    </div>
  </div>);
};

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
      key: `course-${c.course._id}`,
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

    console.log(this.props.match.params.id);

    return (
      <div className={cx(s.root)}>
        <div className={s.wrap}>
          <div className={s.header}>
            <FormattedMessage {...messages.header} />
          </div>
          {
            this.props.loading ? <div className={s.loading}>loading...</div> :
              !this.props.courses ? <NoCourse /> :
              (<div className={s.body}>
                <Accordion panels={renderPanels} styled fluid />
                <Link className={s.add} to={`/coursetable/${this.props.match.params.id}/search`}>
                  <FormattedMessage {...messages.addCourse} />
                </Link>
              </div>)
          }
        </div>
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
