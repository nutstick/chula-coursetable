import { List } from 'immutable';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import * as redux from 'redux';
import BottomFloatingButton from '../../components/BottomFloatingButton';
import CourseTable from '../../components/CourseTable';
import { ICourse, ICourseTable, ICourseTableCourse } from '../../components/share';
import { IAction } from '../../redux/action/reducers';
import { IState } from '../../redux/IState';
import { rightSidebarExpand } from '../../redux/ui/actions';
import * as COURSEINACTIONQUERY from './CourseInActionQuery.gql';
import * as s from './CourseTablePage.css';
import * as COURSETABLEQUERY from './CourseTableQuery.gql';

// TODO Use import
// tslint:disable-next-line:no-var-requires
const MdAdd = require('react-icons/lib/md/add');

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
}

interface IConnectedDispatch {
  onSetSidebarRight?: (e) => void;
}

const mapStateToProps = (state: IState, ownProps: ICourseTablePageProp): IConnectionState => ({
  actions: state.action.get(ownProps.match.params.id),
});

const mapDispatchToProps = (dispatch: redux.Dispatch<IState>): IConnectedDispatch => {
  return {
    onSetSidebarRight: (e) => {
      dispatch(rightSidebarExpand());
    },
  };
};

class CourseTablePage extends React.Component<IConnectionState & IConnectedDispatch & ICourseTablePageProp,
  ICourseTablePageState> {
  constructor(props) {
    super(props);
    this.state = { search: false };
  }

  public shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  private _onClickFloatingButton = (e) => {
    this.props.onSetSidebarRight(e);
  }

  public render() {
    const style = {
      marginRight: 20,
    };
    const courses = List<ICourseTableCourse>(this.props.coursetable.courses)
      // Remove CourseTableCourse that tag REMOVE or CHANGE
      .filter((c) => !(this.props.actions
        .find((a) => (a.type === 'REMOVE' || a.type === 'CHANGE') && a.target === c.section._id)))
      // ADD CourseTableCorses that tag CHANGE or ADD
      .concat(this.props.actionCourses);
    return (
      <div className={s.root}>
        {this.props.coursetable && <CourseTable
          className={s.courseTable}
          _id={this.props.coursetable._id}
          courses={courses.toJS()}
        ></CourseTable>}
        {this.props.loading && <div>Loading</div>}
        <BottomFloatingButton show={!this.state.search} onClick={this._onClickFloatingButton.bind(this)}>
          <MdAdd size={24}></MdAdd>
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
          courses: props.actions && props.actions.filter((a) => a.type === 'ADD' || a.type === 'CHANGE')
            .map((a) => a.target).toJS(),
        },
      };
    },
    props(props) {
      const { data: { courses, error, loading } } = props;
      return {
        loading_: loading && props.loading,
        error,
        actionCourses: courses,
      };
    },
  }),
)(CourseTablePage);
