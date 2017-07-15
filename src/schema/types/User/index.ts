import { ICourseGroup } from '../CourseGroup';
import { ICourseTable } from '../CourseTable';
import { IPage } from '../Pagination';
import resolver from './resolver';
import * as type from './typeDef.gql';

interface IAccount {
  email: string;
}

interface IUser {
  _id?: string;
  name: string;
  account: IAccount;
  avatar: string;
  createAt?: Date;
  updateAt?: Date;

  faculty?: string;
  department?: string;
  enrollYear?: number;

  coursetable: ICourseTable;
  coursetables: IPage<ICourseTable>;

  suggestCourseGroup: ICourseGroup;
}

export {
  resolver,
  type,
  IUser,
};
