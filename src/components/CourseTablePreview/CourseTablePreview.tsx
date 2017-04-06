import * as cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import * as s from './CourseTablePreview.css';

interface ITimeIntervals {
  day: string;
  start: Date;
  end: Date;
}

interface ICourse {
  timeIntervals: ITimeIntervals[];
}

export interface ICourseTablePreview {
  _id: string;
  courses: ICourse[];
}


class CourseTablePreview extends React.Component<void, void> {
  public render () {
    console.log(this.props)
    return (
      <div className={s.root}></div>
    );
  }
}

export default withStyles(s)(CourseTablePreview);
