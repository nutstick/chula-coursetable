import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import CourseTable from '../../components/CourseTable';
import { ICourseTable } from '../../components/CourseTable';
import * as s from './CourseTablePage.css';
import * as COURSETABLEQUERY from './CourseTableQuery.gql';

interface ICourseTablePage extends React.Props<any> {
  coursetable: ICourseTable;
}

class CourseTablePage extends React.Component<ICourseTablePage, void> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div className={s.root}>
        <CourseTable className={s.courseTable} {...this.props.coursetable}></CourseTable>
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  graphql(COURSETABLEQUERY, {
    options(props) {
      return {
        variables: {
          id: props.params.id,
        },
      };
    },
    props({ data: { me: { coursetable }, err, loading } }) {
      return {
        coursetable,
        loading,
        err,
      };
    },
  }),
)(CourseTablePage);
