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
import { pushAddCourseAction, pushChangeSectionAction, pushRemoveCourseAction } from '../../redux/action/actions';

import * as s from './CourseGroupPanel.css';
import * as COURSEGROUPQUERY from './CourseGroupQuery.gql';
import * as COURSELISTQUERY from './CoursesListQuery.gql';

import { IAction } from '../../redux/action/reducers';
import { IState } from '../../redux/IState';
import { ICourseGroup } from '../../schema/types/CourseGroup';
import { ICourseTableCourse } from '../../schema/types/CourseTable';
import { IUser } from '../../schema/types/User';

// TODO use import
// tslint:disable-next-line:no-var-requires
const MdArrowBack = require('react-icons/lib/md/arrow-back');

namespace CourseGroupPanel {
  export interface IProps extends React.Props<any> {
    match: {
      params: {
        id: string,
      },
    };
  }

  export interface ICourseListQuery {
    me: IUser;
  }

  export interface ICourseGroupQuery {
    coursegroup: ICourseGroup;
  }

  export interface IConnectedState {
    actions?: Map<string, IAction>;
  }

  export interface IConnectedDispatch {
    onAddCourseActionTrigger?: (coursetable: string, course, target) => void;
    onChangeSectionActionTrigger?: (coursetable: string, course, target, to) => void;
    onRemoveCourseActionTrigger?: (coursetable: string, course, target) => void;
  }

  export type Props = DefaultChildProps<IProps & IConnectedDispatch & IConnectedState,
                            ICourseListQuery & ICourseGroupQuery>;
}

const messages = defineMessages({
  header: {
    id: 'sidebar.coursegroup.helper',
    defaultMessage: 'Select sections.',
    description: 'Select Course\'s Section',
  },
  addCourse: {
    id: 'sidebar.coursegroup.addcourse',
    defaultMessage: 'Add course',
    description: 'Add course',
  },
});

const mapStateToProps = (state: IState, ownProps): CourseGroupPanel.IConnectedState => ({
  actions: state.action.get(ownProps.match.params.id),
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<IState>): CourseGroupPanel.IConnectedDispatch => {
  return {
    onAddCourseActionTrigger: (coursetable, course, target) => {
      dispatch(pushAddCourseAction(coursetable, course, target));
    },
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

const CourseItem = ({ courseID, name }) => (
  <div className={s.courseItem}>
    <div className={s.header}>{courseID}</div>
    <div className={s.subHeader}>{name}</div>
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

class CourseGroupPanel extends React.Component<CourseGroupPanel.Props, any> {
  public constructor(props) {
    super(props);
  }
  private goBack() {
    this.context.router.goBack();
  }
  private sectionTarget(_id) {
    if (!this.props.actions) {
      return null;
    }
    const action = this.props.actions.get(_id);
    return action && (action.type === 'ADD' ? action.target : action.to);
  }
  private getMyCourse(courses: ICourseTableCourse[], actions: Map<string, IAction>) {
    return courses.filter((c) => !actions || !(actions.valueSeq()
        .find((a) => (a.type === 'REMOVE') && a.target === c.section._id)),
      ).reduce((m, c) => m.set(c.course._id, {
        ...c,
      }), Map<string, ICourseTableCourse>());
  }
  public render() {
    const { data: { coursegroup }, actions } = this.props;
    const courses = this.getMyCourse(coursegroup.courses, actions);

    const renderPanels = coursegroup && coursegroup.courses
      .map((c) => {
        const mySection = courses.getIn([c._id, 'section']);
        const actionSection = this.sectionTarget(c._id);
        return {
          key: `course-${c._id}`,
          title: (<CourseItem name={c.name} courseID={c.courseID}/>),
          content: (
            <div>
              {c.sections.edges.map(({ node }) => (
                <SectionItem
                  key={`${c._id} ${node._id}`}
                  index={node.sectionNo}
                  applied={mySection === node._id || actionSection === node._id}
                  onApply={this.props.onAddCourseActionTrigger
                    .bind(this, this.props.match.params.id, c._id, node._id)}
                  teachers={node.teachers}
                  timeIntervals={node.timeIntervals}
                  type={node.type}
                />
              ))}
            </div>
          ),
        };
      });

    return (
      <div className={cx(s.root)}>
        <div className={s.wrap}>
          <div className={s.header}>
            <Link to={`/coursetable/${this.props.match.params.id}`} className={s.back}>
              <MdArrowBack size={24}></MdArrowBack>
            </Link>
            <span>{coursegroup.name}</span>
          </div>
          <div className={s.subHeader}>
            <FormattedMessage {...messages.header} />
          </div>
          {
            this.props.data.loading ? <div className={s.loading}>loading...</div> :
              coursegroup.courses && (<div className={s.body}>
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
  graphql<CourseGroupPanel.ICourseGroupQuery, CourseGroupPanel.Props>(COURSEGROUPQUERY, {
    options(props) {
      return { variables: { id: props.match.params.id } };
    },
  }),
  graphql<CourseGroupPanel.ICourseListQuery, CourseGroupPanel.Props>(COURSELISTQUERY, {
    options(props) {
      return { variables: { coursetable: props.match.params.id } };
    },
  }),
  connect(mapStateToProps, mapDispatchToProps),
)(CourseGroupPanel);
