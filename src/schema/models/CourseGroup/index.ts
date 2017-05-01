import * as Iridium from 'iridium';
import { Collection, Index, Instance, Model, ObjectID, Property } from 'iridium';

interface ICourseGroupDocument {
  _id?: string;
  name: string;
  courses: string[];

  faculty: string;
  department: string;
  year: number;

  owner?: string;
}

@Index({
  name: 1,
  faculty: 1,
  department: 1,
  year: 1,
})
@Collection('coursegroups')
class CourseGroup extends Instance<ICourseGroupDocument, CourseGroup> implements ICourseGroupDocument {
  @ObjectID
  _id: string;
  @Property(String)
  name: string;
  @Property(String)

  faculty: string;
  @Property(String)
  department: string;
  @Property(Number)
  year: number;

  @Property([String])
  courses: string[];

  @Property(String, false)
  owner: string;
}

export { CourseGroup, ICourseGroupDocument };
