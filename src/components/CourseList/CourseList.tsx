import * as cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { IFullCourse } from '../CourseTable';
import * as s from './CourseList.css';

export interface ICourseList extends React.Props<any> {
  courses: IFullCourse[];
}

class CourseList extends React.Component<ICourseList, void> {
  public render() {
    return (
      <div className={cx(s.root)}>
        {/*{this.props.courses.map((c) => (
          <div key={c.course._id}>{c.course.name}</div>
        ))}*/}
      </div>
    );
  }
}

export default withStyles(s)(CourseList);
