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
  className: string;
  courses: ICourse[];
}


class CourseTablePreview extends React.Component<ICourseTablePreview, void> {
  public render () {
    return (
      <div className={cx(s.root, s.table, this.props.className)}>
        <div className={s.fixAspect} />
        <div className={s.content}>
          {['M', 'T', 'W', 'TH', 'F', 'S'].map((day) => (
            <div className={cx(s.day, s.tableRow)} key={day}>
              <div className={cx(s.dayLabel)}>{day}</div>
              <div className={cx(s.timeWrapper, s.tableRowItem)}>&nbsp;</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  private generateCourseTable () {
    
  }
}

export default withStyles(s)(CourseTablePreview);
