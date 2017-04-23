import * as Iridium from 'iridium';
import { Collection, Index, Instance, Model, ObjectID, Property } from 'iridium';
import { ITimeInterval, TimeInterval } from './TimeInterval';

interface ISectionDocument {
  _id?: string;
  timeIntervals: ITimeInterval[];
  teachers?: string[];
  building?: string;
  classroom?: string;
  type: string;
}

@Index({
  courseId: 1,
})
@Collection('coursetable')
class Section extends Instance<ISectionDocument, Section> implements ISectionDocument {
  @ObjectID
  _id?: string;

  @Property([TimeInterval])
  timeIntervals: ITimeInterval[];
  @Property([String], false)
  teachers?: string[];
  @Property(String, false)
  building?: string;
  @Property(String, false)
  classroom?: string;
  @Property(String)
  type: string;
}

export { Section, ISectionDocument };
