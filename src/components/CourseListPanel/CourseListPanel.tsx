import * as cx from 'classnames';
import { Map } from 'immutable';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { compose, DefaultChildProps, graphql } from 'react-apollo';
import { defineMessages, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Redux from 'redux';
import { Accordion, Checkbox, Label } from 'semantic-ui-react';
import { pushChangeSectionAction, pushRemoveCourseAction } from '../../redux/action/actions';
import NoCourse from '../NoCourse';

// import 'semantic-ui-css/components/accordion.css';
// import 'semantic-ui-css/components/checkbox.css';
// import 'semantic-ui-css/components/label.css';
import * as COURSEINACTIONQUERY from './CourseInActionQuery.gql';
import * as s from './CourseListPanel.css';
import * as COURSELISTQUERY from './CoursesListQuery.gql';

import { IAction } from '../../redux/action/reducers';
import { IState } from '../../redux/IState';
import { ICourseTableCourse } from '../../schema/types/CourseTable';
import { IUser } from '../../schema/types/User';

namespace CourseListPanel {
  export interface IProps extends React.Props<any> {
    match: {
      params: {
        id: string,
      },
    };
  }

  export interface ICourseInActionQuery {
    courses: ICourseTableCourse[];
  }

  export interface ICourseListQuery {
    me: IUser;
  }

  export interface IConnectedState {
    actions?: Map<string, IAction>;
  }

  export interface IConnectedDispatch {
    onChangeSectionActionTrigger?: (coursetable: string, course, target, to) => void;
    onRemoveCourseActionTrigger?: (coursetable: string, course, target) => void;
  }

  export type Props = DefaultChildProps<IProps & IConnectedDispatch & IConnectedState,
                            ICourseListQuery & ICourseInActionQuery>;
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

const mapStateToProps = (state: IState, ownProps): CourseListPanel.IConnectedState => ({
  actions: state.action.get(ownProps.match.params.id),
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<IState>): CourseListPanel.IConnectedDispatch => {
  return {
    onChangeSectionActionTrigger: (coursetable, course, target, to) => {
      dispatch(pushChangeSectionAction(coursetable, course, target, to));
    },
    onRemoveCourseActionTrigger: (coursetable, course, target) => {
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

class CourseListPanel extends React.Component<CourseListPanel.Props, void> {
  // TODO Merge class with CourseGroupPanel
  private getMyCourse(courses: ICourseTableCourse[], actions: Map<string, IAction>) {
    return courses.filter((c) => !actions || !(actions.valueSeq()
        .find((a) => (a.type === 'REMOVE') && a.target === c.section._id)),
      ).reduce((m, c) => m.set(c.course._id, {
        ...c,
      }), Map<string, ICourseTableCourse>());
  }
  public render() {
    const { data: { me }, actions } = this.props;
    const courses = me && me.coursetable && this.getMyCourse(me.coursetable.courses, actions);
    const actionCourses = this.props.data.courses && this.props.data.courses
      .reduce((m, c) => m.set(c.course._id, {
        ...c,
      }), Map<string, ICourseTableCourse>());

    const mergedCourses = courses && courses.merge(actionCourses).valueSeq();

    const renderPanels = mergedCourses && mergedCourses
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
            this.props.data.loading ? <div className={s.loading}>loading...</div> :
              mergedCourses && mergedCourses.count() ? (<div className={s.body}>
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
  graphql<CourseListPanel.ICourseInActionQuery, CourseListPanel.Props>(COURSEINACTIONQUERY, {
    options(props) {
      return {
        variables: {
          ids: props.actions && props.actions.valueSeq().filter((a) => a.type === 'ADD' || a.type === 'CHANGE')
            .map((a) => (a.type === 'ADD' ? a.target : a.to)).toJS(),
        },
      };
    },
  }),
  graphql<CourseListPanel.ICourseListQuery, CourseListPanel.Props>(COURSELISTQUERY, {
    options(props) {
      return { variables: { coursetable: props.match.params.id } };
    },
  }),
  connect(mapStateToProps, mapDispatchToProps),
)(CourseListPanel);
