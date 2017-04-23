import * as cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { CourseTablePreview, ICourse, ICourseTablePreview } from '../CourseTablePreview/CourseTablePreview';
import TimeInterval from '../TimeInterval';
import { ITimeInterval } from '../TimeInterval/TimeInterval';
import * as s from './CourseTable.css';

export interface ICourseDetail {
  _id?: string;
  name?: string;
}
export interface IFullCourse extends ICourse {
  course: ICourseDetail;
  section: number;
}

class CourseTable extends CourseTablePreview<ICourseTablePreview<IFullCourse>> {
  public render() {
    return (
      <div className={cx(s.root, s.table, this.props.className)}>
        <div className={s.fixAspect} />
        <div className={s.content}>
          {['M', 'T', 'W', 'TH', 'F', 'S'].map((day, index) => (
            <div className={cx(s.day, s.tableRow)} key={day}>
              <div className={cx(s.dayLabel)}>{day}</div>
              <div className={cx(s.timeWrapper, s.tableRowItem)}>
                {this.coursetable[index] && this.coursetable[index].map((m) => (
                  <TimeInterval
                    key={[day, m.start, m.position].join('-')}
                    maxTime={this.maxTime}
                    {...m}
                  >
                    <div className={s.timeInterval}></div>
                  </TimeInterval>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(CourseTable);
