import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { FormattedRelative } from 'react-intl';
import { Link } from 'react-router';
import { default as CourseTablePreview, ICourseTablePreview } from '../../components/CourseTablePreview';
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
              <Link key={item.node._id} className={s.item} to={`coursetable/${item.node._id}`}>
                <CourseTablePreview className={s.courseTable} {...item.node} />
              </Link>
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
