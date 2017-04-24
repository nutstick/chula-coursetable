import * as Iridium from 'iridium';
import { Collection, Index, Instance, Model, ObjectID, Property } from 'iridium';
import { ApprovedCourse, IApprovedCourseDocument } from './ApprovedCourse';
import { GenedCourse, IGenedCourseDocument } from './GenedCourse';

enum CourseType {
    NORMAL = 1,
    GENED = 2,
    APPROVED = 3,
}

interface ICourseDocument {
  _id?: string;
  courseID: string;
  name: string;
  credit: number;
  exam?: Date[];
  type: CourseType;

  gened?: IGenedCourseDocument;
  approve?: IApprovedCourseDocument;

  sections: string[];

  owner?: string;
}

@Index({
  courseId: 1,
})
@Collection('course')
class Course extends Instance<ICourseDocument, Course> implements ICourseDocument {
  @ObjectID
  _id: string;
  @Property(String, true)
  courseID: string;
  @Property(String, true)
  name: string;
  @Property(Number, true)
  credit: number;
  @Property([Date], false)
  exam: Date[];
  @Property(Number, true)
  type: CourseType;

  @Property(GenedCourse, false)
  gened: IGenedCourseDocument;
  @Property(ApprovedCourse, false)
  approve: IApprovedCourseDocument;

  @Property([String])
  sections: string[];

  @Property(String, false)
  owner: string;
}

export { Course, ICourseDocument };
