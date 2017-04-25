import { List } from 'immutable';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import * as redux from 'redux';
import { Button } from 'semantic-ui-react';
import BottomFloatingButton from '../../components/BottomFloatingButton';
import CourseTable from '../../components/CourseTable';
import { ICourse, ICourseTable, ICourseTableCourse } from '../../components/share';
import { clearActions, execActions } from '../../redux/action/actions';
import { IAction } from '../../redux/action/reducers';
import { IState } from '../../redux/IState';
import { rightSidebarExpand, rightSidebarToggle } from '../../redux/ui/actions';
import * as COURSEINACTIONQUERY from './CourseInActionQuery.gql';
import * as s from './CourseTablePage.css';
import * as COURSETABLEQUERY from './CourseTableQuery.gql';

// TODO Use import
// tslint:disable-next-line:no-var-requires
const FaAngleLeft = require('react-icons/lib/fa/angle-left');
// tslint:disable-next-line:no-var-requires
const FaAngleRight = require('react-icons/lib/fa/angle-right');

interface ICourseTablePageProp extends React.Props<any> {
  coursetable: ICourseTable;
  actionCourses: ICourseTableCourse[];
  loading: boolean;
  error: Error;
  match: {
    params: {
      id: string;
    },
  };
}

interface ICourseTablePageState {
  search: boolean;
}

interface IConnectionState {
  show?: boolean;
  actions?: List<IAction>;
  rightSidebarExpand: boolean;
}

interface IConnectedDispatch {
  onRightSidebarExpand?: (e?) => void;
  onToggleRightSidebar?: (e?) => void;
  onExecuteAction?: (e) => void;
  onClearAction?: (e) => void;
}

const mapStateToProps = (state: IState, ownProps: ICourseTablePageProp): IConnectionState => ({
  actions: state.action.get(ownProps.match.params.id),
  rightSidebarExpand: state.ui.sidebar.expand.right,
});

const mapDispatchToProps = (dispatch: redux.Dispatch<IState>): IConnectedDispatch => {
  return {
    onRightSidebarExpand: () => {
      dispatch(rightSidebarExpand());
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

class CourseTablePage extends React.Component<IConnectionState & IConnectedDispatch & ICourseTablePageProp,
  ICourseTablePageState> {
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

  public render() {
    const style = {
      marginRight: 20,
    };

    const courses = this.props.coursetable && List<ICourseTableCourse>(this.props.coursetable.courses)
      // Remove CourseTableCourse that tag REMOVE or CHANGE
      .filter((c) => !this.props.actions || !(this.props.actions
        .find((a) => (a.type === 'REMOVE' || a.type === 'CHANGE') && a.target === c.section._id)),
      )
      // ADD CourseTableCorses that tag CHANGE or ADD
      .concat(this.props.actionCourses || [])
      .toJS();


    return (
      <div className={s.root}>
        {this.props.coursetable && <CourseTable
          className={s.courseTable}
          _id={this.props.coursetable._id}
          courses={courses}
        ></CourseTable>}
        {this.props.loading && <div>Loading</div>}
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
  connect(mapStateToProps, mapDispatchToProps),
  graphql(COURSETABLEQUERY, {
    options(props) {
      return {
        variables: {
          id: props.match.params.id,
        },
      };
    },
    props(props) {
      const { data: { me, error, loading } } = props;
      let coursetable = null;
      if (!loading) {
        coursetable = me.coursetable;
      }
      return {
        coursetable,
        loading,
        error,
      };
    },
  }),
  graphql(COURSEINACTIONQUERY, {
    options(props) {
      return {
        variables: {
          ids: props.actions && props.actions.filter((a) => a.type === 'ADD' || a.type === 'CHANGE')
            .map((a) => (a.type === 'ADD' ? a.target : a.to)).toJS(),
        },
      };
    },
    props(props) {
      const { data: { courses, error, loading } } = props;
      return {
        loading_: loading && props.loading,
        error,
        actionCourses: courses && courses.map((c) => ({
          color: 'PREVIEW',
          ...c,
        })),
      };
    },
  }),
)(CourseTablePage);
