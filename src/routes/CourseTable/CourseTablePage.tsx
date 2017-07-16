import { List, Map } from 'immutable';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { compose, DefaultChildProps, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import * as redux from 'redux';
import { Button, Dropdown } from 'semantic-ui-react';
import BottomFloatingButton from '../../components/BottomFloatingButton';
import CourseTable from '../../components/CourseTable';
import { clearActions, execActions } from '../../redux/action/actions';
import { rightSidebarExpand, rightSidebarToggle } from '../../redux/ui/actions';

// import 'semantic-ui-css/components/button.css';
import * as COURSEINACTIONQUERY from './CourseInActionQuery.gql';
import * as s from './CourseTablePage.css';
import * as COURSETABLEQUERY from './CourseTableQuery.gql';

import { IAction } from '../../redux/action/reducers';
import { IState } from '../../redux/IState';
import { ICourseTableCourse } from '../../schema/types/CourseTable';
import { IUser } from '../../schema/types/User';

// TODO Use import
// tslint:disable-next-line:no-var-requires
const FaAngleLeft = require('react-icons/lib/fa/angle-left');
// tslint:disable-next-line:no-var-requires
const FaAngleRight = require('react-icons/lib/fa/angle-right');
// tslint:disable-next-line:no-var-requires
const FaCog = require('react-icons/lib/fa/cog');

namespace CourseTablePage {
  export interface IProps extends React.Props<any> {
    match: {
      params: {
        id: string,
      },
    };
  }

  export interface ICourseTableQuery {
    me: IUser;
  }

  export interface ICourseInActionsQuery {
    courses: ICourseTableCourse[];
  }

  export interface IConnectedState {
    show?: boolean;
    actions?: Map<string, IAction>;
    rightSidebarExpand: boolean;
  }

  export interface IConnectedDispatch {
    onRightSidebarExpand?: (e?) => void;
    onToggleRightSidebar?: (e?) => void;
    onExecuteAction?: (e) => void;
    onClearAction?: (e) => void;
  }

  interface IStateType {
    search: boolean;
  }

  export type Props = DefaultChildProps<IProps & IConnectedDispatch & IConnectedState,
                            ICourseTableQuery & ICourseInActionsQuery>;
  export type State = IStateType;
}

const mapStateToProps = (state: IState, ownProps: CourseTablePage.IProps): CourseTablePage.IConnectedState => ({
  actions: state.action.get(ownProps.match.params.id),
  rightSidebarExpand: state.ui.sidebar.expand.right,
});

const mapDispatchToProps = (dispatch: redux.Dispatch<IState>): CourseTablePage.IConnectedDispatch => {
  return {
    onRightSidebarExpand: () => {
      dispatch(rightSidebarExpand(true));
    },
    onToggleRightSidebar: () => {
      dispatch(rightSidebarToggle());
    },
    onExecuteAction: (coursetable) => {
      dispatch(execActions(coursetable));
    },
    onClearAction: (coursetable) => {
      dispatch(clearActions(coursetable));
    },
  };
};

class CourseTablePage extends React.Component<CourseTablePage.Props, CourseTablePage.State> {
  constructor(props) {
    super(props);
    this.state = { search: false };
  }
  public componentWillMount() {
    this.props.onRightSidebarExpand();
  }
  public shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  private _onClickFloatingButton = (e?) => {
    this.props.onToggleRightSidebar(e);
  }
  private getMyCourse(courses: ICourseTableCourse[], actions: Map<string, IAction>) {
    return courses.filter((c) => !actions || !(actions.valueSeq()
        .find((a) => (a.type === 'REMOVE' || a.type === 'CHANGE') && a.target === c.section._id
          && a.to !== c.section._id)),
      )
      .reduce((m, c) => m.set(c.course._id, {
        ...c,
      }), Map<string, ICourseTableCourse>());
  }

  public render() {
    const style = {
      marginRight: 20,
    };
    const { data: { me, loading, error }, actions } = this.props;
    const courses = me && me.coursetable && this.getMyCourse(me.coursetable.courses, actions);
    const actionCourses = this.props.data.courses && this.props.data.courses
      .reduce((m, c) => m.set(c.course._id, {
        color: 'PREVIEW',
        ...c,
      }), Map<string, ICourseTableCourse>());

    const mergedCourses = courses && courses.merge(actionCourses).valueSeq().toArray();

    return (
      <div className={s.root}>
        {<div>
          <h2 className={s.header}>
            {me && <span>{me.coursetable.name}</span>}
            <Dropdown icon="setting" floating button className="icon">
              <Dropdown.Menu className={s.menu}>
                <Dropdown.Item icon="table" text="Export to Excel" />
                <Dropdown.Item icon="google" text="Export to Google" />
                <Dropdown.Item icon="remove" text="Delete" />
              </Dropdown.Menu>
            </Dropdown>
          </h2>
          <CourseTable
            className={s.courseTable}
            _id={me && me.coursetable._id}
            courses={mergedCourses}
            loading={loading}
          ></CourseTable>
        </div>}
        {this.props.actions && <div className={s.actionHolder}>
          <Button.Group>
            <Button
              className={s.clearButton}
              onClick={this.props.onClearAction.bind(this, this.props.match.params.id)}
            >Cancel</Button>
            <Button.Or />
            <Button
            className={s.apply}
              onClick={this.props.onExecuteAction.bind(this, this.props.match.params.id)}
              color="green"
              positive
            >Save</Button>
          </Button.Group>
        </div>}
        <BottomFloatingButton show={true} onClick={this._onClickFloatingButton.bind(this)}>
          {this.props.rightSidebarExpand ?
            <FaAngleRight size={24} /> : <FaAngleLeft size={24} />}
        </BottomFloatingButton>
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  graphql<CourseTablePage.ICourseInActionsQuery, CourseTablePage.Props>(COURSEINACTIONQUERY, {
    options(props) {
      return {
        variables: {
          ids: props.actions && props.actions.valueSeq().filter((a) => a.type === 'ADD' || a.type === 'CHANGE')
            .map((a) => (a.type === 'ADD' ? a.target : a.to)).toJS(),
        },
      };
    },
  }),
  graphql(COURSETABLEQUERY, {
    options(props) {
      return { variables: { id: props.match.params.id } };
    },
  }),
  connect(mapStateToProps, mapDispatchToProps),
)(CourseTablePage);
