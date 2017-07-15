import { ICourse } from '../Course';
import { ISection } from '../Section';
import resolver from './resolver';
import * as type from './typeDef.gql';

interface ICourseTable {
  _id: string;
  name?: string;
  courses?: ICourseTableCourse[];
  __typename?: string;
}

interface ICourseTableCourse {
  course?: ICourse;
  section?: ISection;
  color?: string;
  __typename?: string;
}

export {
  resolver,
  type,
  ICourseTable,
  ICourseTableCourse,
};
