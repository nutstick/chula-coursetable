import * as cx from 'classnames';
import { Map } from 'immutable';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { defineMessages, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Redux from 'redux';
// import 'semantic-ui-css/components/accordion.css';
// import 'semantic-ui-css/components/checkbox.css';
// import 'semantic-ui-css/components/label.css';
import { Accordion, Checkbox, Label } from 'semantic-ui-react';
import { pushChangeSectionAction, pushRemoveCourseAction } from '../../redux/action/actions';
import { IAction } from '../../redux/action/reducers';
import { IState } from '../../redux/IState';
import NoCourse from '../NoCourse';
import { ICourse, ICourseTableCourse } from '../share';
import * as COURSEINACTIONQUERY from './CourseInActionQuery.gql';
import * as s from './CourseListPanel.css';
import * as COURSELISTQUERY from './CoursesListQuery.gql';

export interface ICourseList extends React.Props<any> {
  courses?: Map<string, ICourseTableCourse>;
  actionCourses?: Map<string, ICourseTableCourse>;
  loading: boolean;
  error: Error;
  match: {
    params: {
      id: string,
    },
  };
}

interface IConnectionState {
  actions?: Map<string, IAction>;
}

interface IConnectedDispatch {
  onChangeSectionActionTrigger?: (coursetable: string, course, target, to) => void;
  onRemoveCourseActionTrigger?: (coursetable: string, course, target) => void;
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
  or: {
    id: 'sidebar.courselist.or',
    defaultMessage: 'or',
    description: 'Or word',
  },
  addCourse: {
    id: 'sidebar.courselist.addcourse',
    defaultMessage: 'Add course',
    description: 'Add course',
  },
});

const mapStateToProps = (state: IState, ownProps): IConnectionState => ({
  actions: state.action.get(ownProps.match.params.id),
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<IState>): IConnectedDispatch => {
  return {
    onChangeSectionActionTrigger: (coursetable, course, target, to) => {
      const self: any = this;
      dispatch(pushChangeSectionAction(coursetable, course, target, to));
    },
    onRemoveCourseActionTrigger: (coursetable, course, target) => {
      const self: any = this;
      dispatch(pushRemoveCourseAction(coursetable, course, target));
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
            <span key={`${day}:${start}:${end}`}>{day} {start} - {end}</span>
          ))}
        </span>
      </div>
      <Label className={s.tags} as="a" tag color={colorType} size="mini">{type}</Label>
    </div>
  </div>);
};

class CourseListPanel extends React.Component<IConnectionState & IConnectedDispatch & ICourseList, void> {
  constructor(props) {
    super(props);
  }

  public render() {
    const mergeCourses = this.props.courses && this.props.courses
      .merge(this.props.actionCourses)
      .valueSeq();

    const renderPanels = mergeCourses && mergeCourses
      .toJS()
      .map((c) => ({
        key: `course-${c.course._id}`,
        title: (<CourseItem name={c.course.name} courseID={c.course.courseID} sectionNo={c.section.sectionNo}/>),
        content: (
          <div>
            {c.course.sections.edges.map(({ node }) => (
              <SectionItem
                key={`${c._id} ${node._id}`}
                index={node.sectionNo}
                applied={c.section._id === node._id}
                onApply={this.props.onChangeSectionActionTrigger
                  .bind(this, this.props.match.params.id, c.course._id, c.section._id, node._id)}
                {...node}
              />
            ))}
          </div>
        ),
      }));

    return (
      <div className={cx(s.root)}>
        <div className={s.wrap}>
          <div className={s.header}>
            <FormattedMessage {...messages.header} />
          </div>
          {
            this.props.loading ? <div className={s.loading}>loading...</div> :
              mergeCourses && mergeCourses.count() ? (<div className={s.body}>
                <Accordion panels={renderPanels} styled fluid />
                <Link className={s.add} to={`/coursetable/${this.props.match.params.id}/search`}>
                  <FormattedMessage {...messages.addCourse} />
                </Link>
              </div>) : <NoCourse id={this.props.match.params.id} />
          }
        </div>
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  connect(mapStateToProps, mapDispatchToProps),
  graphql(COURSEINACTIONQUERY, {
    options(props) {
      return {
        variables: {
          ids: props.actions && props.actions.valueSeq().filter((a) => a.type === 'ADD' || a.type === 'CHANGE')
            .map((a) => (a.type === 'ADD' ? a.target : a.to)).toJS(),
        },
      };
    },
    props(props) {
      const { data: { courses, error, loading } } = props;
      return {
        loading,
        error,
        actionCourses: courses && courses.reduce((m, c) => m.set(c.course._id, {
          ...c,
        }), Map<string, ICourseTableCourse>()),
      };
    },
  }),
  graphql(COURSELISTQUERY, {
    options(props) {
      return {
        variables: {
          coursetable: props.match.params.id,
        },
      };
    },
    props(props) {
      const { data: { me, error, loading }, actions } = props;
      return {
        courses: me && me.coursetable && me.coursetable.courses
          .filter((c) => !actions || !(actions.valueSeq()
            .find((a) => (a.type === 'REMOVE') && a.target === c.section._id)),
          )
          .reduce((m, c) => m.set(c.course._id, {
            ...c,
          }), Map<string, ICourseTableCourse>()),
        loading,
        error,
      };
    },
  }),
)(CourseListPanel);
