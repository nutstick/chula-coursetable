import gql from 'graphql-tag';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { FormattedRelative } from 'react-intl';
import CourseTablePreview from '../../components/CourseTablePreview';
import { ICourseTablePreview } from '../../components/CourseTablePreview/CourseTablePreview';
import * as COURSETABLEPREVIEWQUERY from './CourseTablePreviewQuery.gql';
import * as s from './Home.css';

interface IHome extends React.Props<any> {
  coursetables: ICourseTablePreview[];
  data: {
    me: {
      coursetables: {
        edges: Array<{
          node: ICourseTablePreview,
        }>,
        pageInfo: {
          endCursor: string,
        },
      },
    },
  };
}

class Home extends React.Component<IHome, void> {
  constructor(props) {
    super(props);
  }

  public render() {
    const { data: { me: { coursetables } } } = this.props;
    return (
      <div className={s.root}>
        <div className={s.container}>
          {
            coursetables.edges.map((item) => (
              <CourseTablePreview key={item.node._id} className={s.courseTable}{...item.node} />
            ))
          }
        </div>
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  graphql(COURSETABLEPREVIEWQUERY),
)(Home);
