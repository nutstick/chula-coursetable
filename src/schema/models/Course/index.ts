import * as Iridium from 'iridium';
import { Collection, Index, Instance, Model, ObjectID, Property } from 'iridium';
import { ApprovedCourse, IApprovedCourseDocument } from './ApprovedCourse';
import { GenedCourse, IGenedCourseDocument } from './GenedCourse';

interface ICourse {
  _id?: string;
  courseID: string;
  name: string;
  shortName: string;
  credit: number;
  exam?: Date[];

  gened: IGenedCourseDocument;
  approve: IApprovedCourseDocument;

  sections: string[];

  owner: string;
}

@Index({
  courseId: 1,
})
@Collection('coursetable')
class Course extends Instance<ICourse, Course> implements ICourse {
  @ObjectID
  _id: string;
  @Property(String, true)
  courseID: string;
  @Property(String, true)
  name: string;
  @Property(String, true)
  shortName: string;
  @Property(Number, true)
  credit: number;
  @Property([Date], false)
  exam: Date[];

  @Property(GenedCourse, false)
  gened: IGenedCourseDocument;
  @Property(ApprovedCourse, false)
  approve: IApprovedCourseDocument;

  @Property([String])
  sections: string[];

  @Property(String, false)
  owner: string;
}

export { Course, ICourse };
