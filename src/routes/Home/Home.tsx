import gql from 'graphql-tag';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { FormattedRelative } from 'react-intl';
import CourseTablePreview from '../../components/CourseTablePreview';
import { ICourseTablePreview } from '../../components/CourseTablePreview/CourseTablePreview';
import * as s from './Home.css';

interface IHome extends React.Props<any> {
  coursetables: ICourseTablePreview[];
}

class Home extends React.Component<IHome, void> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          {this.props.coursetables.map((item) => (
            <CourseTablePreview {...item} />
          ))}
        </div>
      </div>
    );
  }
}

const CourseTablePreviews = gql`
  query Me {
    coursetable {
      preview
    }
  }
`;

export default graphql(CourseTablePreviews)(withStyles(s)(Home));
