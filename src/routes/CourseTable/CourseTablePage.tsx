import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import * as redux from 'redux'
import BottomFloatingButton from '../../components/BottomFloatingButton';
import CourseTable from '../../components/CourseTable';
import { ICourseTable } from '../../components/CourseTable';
import { IState } from '../../redux/IState';
import { rightSidebarExpand } from '../../redux/ui/actions';
import * as s from './CourseTablePage.css';
import * as COURSETABLEQUERY from './CourseTableQuery.gql';

// TODO Use import
// tslint:disable-next-line:no-var-requires
const MdAdd = require('react-icons/lib/md/add');

interface ICourseTablePageProp extends React.Props<any> {
  coursetable: ICourseTable;
  match: any;
}

interface ICourseTablePageState {
  search: boolean;
}

interface IConnectionState {
  show?: boolean;
}

interface IConnectedDispatch {
  onSetSidebarRight?: (e) => void;
}

const mapStateToProps = (state: IState): IConnectionState => ({});

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

  private _onClickFloatingButton = (e) => {
    this.props.onSetSidebarRight(e);
  }

  public render() {
    const style = {
      marginRight: 20,
    };
    return (
      <div className={s.root}>
        <CourseTable className={s.courseTable} {...this.props.coursetable}></CourseTable>
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
      const { data: { me, err, loading } } = props;
      try {
        const { coursetable } = me;
        return {
          coursetable,
          loading,
          err,
        };
      } catch (err) {
        return {
          coursetable: null,
          loading,
          err,
        };
      }
    },
  }),
)(CourseTablePage);
