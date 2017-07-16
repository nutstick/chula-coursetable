import * as cx from 'classnames';
import { List, Map, Seq } from 'immutable';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { Loader } from 'semantic-ui-react';
import { IAction } from '../../redux/action/reducers';
import TimeInterval from '../TimeInterval';
import * as s from './CourseTablePreview.css';

import { ICourseTableCourse } from '../../schema/types/CourseTable';
import { ITimeInterval } from '../../schema/types/TimeInterval';

interface IEventPoint {
  // Interval Index in Day base list
  index: number;
  // Type (0 = Start, 1 = End)
  type: number;
  // Time format in Integer
  timestamp: number;
}

export namespace CourseTablePreview {
  interface IProps extends React.Props<any> {
    _id: string;
    className?: string;
    courses?: ICourseTableCourse[];
    loading?: boolean;
    error?: string;
  }

  export type Props = IProps;
}

export class CourseTablePreview extends React.Component<CourseTablePreview.Props> {
  protected coursetable: Array<Seq.Indexed<TimeInterval.Props>>;
  protected maxTime: number;

  public componentWillMount() {
    this.generateCourseTable({ courses: this.props.courses });
  }

  public componentWillReceiveProps(props) {
    this.generateCourseTable({ courses: props.courses });
  }

  public render() {
    const maxTime = this.maxTime;
    // TODO Error handling
    return (
      <div className={cx(s.root, s.table, this.props.className)}>
        <div className={s.fixAspect} />
        {this.props.loading && <Loader>Loading</Loader>}
        <div className={s.content}>
          {['M', 'T', 'W', 'TH', 'F', 'S'].map((day, index) => (
            <div className={cx(s.day, s.tableRow)} key={day}>
              <div className={cx(s.dayLabel)}>{day}</div>
              <div className={cx(s.timeWrapper, s.tableRowItem)}>
                {this.coursetable[index] && this.coursetable[index].map((m) => (
                  <TimeInterval
                    key={[day, m.start, m.position].join('-')}
                    maxTime={maxTime}
                    {...m}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  private convertTimeToInt(time: string) {
    const [h, m] = time.split(':');
    return parseInt(h, 10) * 60 + parseInt(m, 10);
  }

  /* Calculate interval size for rendering cousetable correctly */
  protected generateCourseTable({ courses }: { courses?: ICourseTableCourse[] }) {
    if (!courses) {
      this.coursetable = [null, null, null, null, null, null];
      return;
    }
    // Day list
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    // Day base course list
    const ct: TimeInterval.Props[][] = [[], [], [], [], []];

    // Convert course list to day base course list.
    courses.forEach((({ section: { timeIntervals, ...section }, course, color }) => {
      timeIntervals.forEach(((time) => {
        const matchedDay = days.findIndex((day) => day === time.day.toLowerCase());
        ct[matchedDay].push({
          start: time.start,
          end: time.end,
          ...section,
          ...course,
          color,
        });
      }).bind(this));
    }).bind(this));

    // Find Max Time
    this.maxTime = ct.reduce((m, d) => Math.max(m, d.reduce((_m, p) =>
      Math.max(_m, this.convertTimeToInt(p.start)), -1)), -1);

    // Convert time interval into event points list.
    const pointList = ct.map((d) => d.reduce((points, {start, end}, index) => (
        points
          .push({ index, type: 0, timestamp: this.convertTimeToInt(start) })
          .push({ index, type: 1, timestamp: this.convertTimeToInt(end) })
      ), List<IEventPoint>())
      .sort((a, b) => (a.timestamp !== b.timestamp ?
        a.timestamp - b.timestamp : (a.type !== b.type ? b.type - a.type : 0))),
    );

    // Calculate interval size for rendering cousetable correctly
    this.coursetable = pointList.map((d, day) => {
      // Collect current stack size.
      let currentTop = 0;
      // Collect maximum stack size of wave.
      let maxTop = 0;
      // In Queue list
      let inQueueList = [];

      const { positionIndex: p } = d.reduce(({ avaliablePosition, positionIndex }, point) => {
        // If point is end point deceased currentTop else inceased.
        currentTop = currentTop + (point.type === 0 ? 1 : -1);
        // Calculate maximum top with new top.
        maxTop = Math.max(maxTop, currentTop);

        // If start assign new position to interval
        // If end point set position index to avaliable
        if (point.type === 0) {
          const position = avaliablePosition.isEmpty() ? maxTop : avaliablePosition.first();
          const { start, end, ...detail } = ct[day][point.index];

          return {
            avaliablePosition: avaliablePosition.isEmpty() ? avaliablePosition : avaliablePosition.shift(),
            positionIndex: positionIndex.set(point.index, {
              start,
              end,
              ...detail,
              position,
            }),
          };
        } else {
          // TODO Some randomize push to list to make interval bundle
          // feel more beautiful arrange
          inQueueList.push(point.index);
          // New PositionIndex
          let newPositionIndex = positionIndex;

          // End of wave update the size by highest stack value
          if (currentTop === 0) {
            newPositionIndex = inQueueList.reduce((m, i) =>
              m.update(i, (x) => {
                x.size = maxTop;
                return x;
              }),
              newPositionIndex,
            );
            // Clear in queue list
            inQueueList = [];
          }

          return {
            avaliablePosition: avaliablePosition.push(positionIndex.get(point.index).position),
            positionIndex: newPositionIndex,
          };
        }
      }, {
        avaliablePosition: List<number>(),
        positionIndex: Map<number, TimeInterval.Props>(),
      });

      return p.valueSeq();
    });
  }
}

export default withStyles(s)(CourseTablePreview);
