import * as cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { ITimeInterval } from '../share';
import * as s from './TimeInterval.css';

export interface ITimeIntervalProps extends ITimeInterval {
  start: string;
  end: string;
  size?: number;
  position?: number;
  maxTime?: number;
  ID?: string;

  courseID?: string;
  name?: string;
  credit?: string;

  sectionNo?: string;
  building?: string;
  classroom?: string;
  type?: string;

  color: string;
}

class TimeInterval extends React.Component<ITimeIntervalProps, void> {
  public convertTimeToInt(time: string) {
    const [h, m] = time.split(':');
    return parseInt(h, 10) * 60 + parseInt(m, 10);
  }

  public render() {
    // Extract variable
    const { start, end, size, position, color } = this.props;
    let { maxTime } = this.props;
    const start_ = this.convertTimeToInt(start);
    const end_ = this.convertTimeToInt(end);

    // Set time range of showed timetable
    // 8:00 = 8 * 60 = 480
    // 16:00 = 16 * 60 = 960
    // 21:00 = 21 * 60 = 1260
    const minTime = 480;
    maxTime = maxTime > 960 ? 1260 : 960;

    const customStyle = {
      left: `${(start_ - minTime) * 100 / (maxTime - minTime)}%`,
      width: `${(end_ - start_) * 100 / (maxTime - minTime)}%`,
      height: `calc(${100 / (size || 1)}%)`,
      top: `${(position - 1 || 0) * 100 / (size || 1)}%`,
    };
    return (
      <div className={cx(s.root, { [s.preview]: color === 'PREVIEW' })} style={customStyle}>
        {this.props.name && (
          <div className={s.wrap}>
            <div className={s.name}>
              {/*<b>{this.props.courseID}</b>*/}
              {this.props.name} ({this.props.sectionNo})
            </div>
            <div className={s.classRoom}>
              <span className={s.building}>{this.props.building}</span>{this.props.classroom}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(s)(TimeInterval);
