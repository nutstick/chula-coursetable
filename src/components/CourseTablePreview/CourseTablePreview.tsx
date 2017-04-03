import * as cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import * as s from './CourseTablePreview.css';

export interface ICourse {
  start: Date;
  end: Date;
}

export interface ICourseTablePreview {
  id: string;
  course: ICourse[];
}


class CourseTablePreview extends React.Component<void, void> {
  public render () {
    return (
      <div className={s.root}></div>
    );
  }
}

export default withStyles(s)(CourseTablePreview);
