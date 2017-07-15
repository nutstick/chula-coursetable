import { ICourse } from '../Course';
import resolver from './resolver';
import * as type from './typeDef.gql';

interface ICourseGroup {
  _id: string;
  name?: string;
  faculty: string;
  department?: string;
  year?: string;
  courses?: ICourse[];
  __typename?: string;
}

export {
  resolver,
  type,
  ICourseGroup,
};
