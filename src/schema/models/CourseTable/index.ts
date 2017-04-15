import * as Iridium from 'iridium';
import { Collection, Index, Instance, Model, ObjectID, Property } from 'iridium';
import { CourseTableCourse, ICourseTableCourse } from './CourseTableCourse';

interface ICourseTableDocument {
  _id?: string;
  courses?: ICourseTableCourse[];
  owner: string;
}

@Index({
  owner: 1,
})
@Collection('coursetable')
class CourseTable extends Instance<ICourseTableDocument, CourseTable> implements ICourseTableDocument {
  @ObjectID
  _id: string;
  @Property(CourseTableCourse, false)
  courses: ICourseTableCourse[];
  @Property(Date, false)
  createAt: Date;
  @Property(Date, false)
  updateAt: Date;

  @Property(String, true)
  owner: string;
}

export { ICourseTableDocument, CourseTable };
