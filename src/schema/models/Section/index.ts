import * as Iridium from 'iridium';
import { Collection, Index, Instance, Model, ObjectID, Property } from 'iridium';
import { ITimeInterval, TimeInterval } from './TimeInterval';

interface ISectionDocument {
  _id?: string;
  sectionNo: number;
  timeIntervals: ITimeInterval[];
  teachers?: string[];
  building?: string;
  classroom?: string;
  type: number;
}

@Index({
  courseId: 1,
})
@Collection('section')
class Section extends Instance<ISectionDocument, Section> implements ISectionDocument {
  @ObjectID
  _id?: string;


  @Property(Number, true)
  sectionNo: number;
  @Property([TimeInterval])
  timeIntervals: ITimeInterval[];
  @Property([String], false)
  teachers?: string[];
  @Property(String, false)
  building?: string;
  @Property(String, false)
  classroom?: string;
  @Property(Number)
  type: number;
}

export { Section, ISectionDocument };
