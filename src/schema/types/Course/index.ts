import { IPage } from '../Pagination';
import { ISection } from '../Section';
import resolver from './resolver';
import * as type from './typeDef.gql';

// TODO Global Graphql (get rid of __typename)
interface ICourse {
  _id: string;
  courseID?: string;
  name?: string;
  credit?: string;
  exam?: string;

  sections?: IPage<ISection>;
  __typename?: string;
}

interface IGenedCourse extends ICourse {
  type?: string;
  genedSections?: IPage<ISection>;
}

interface IApprovedCourse extends ICourse {
  faculty?: string;
  department?: string;
  approvedSections?: IPage<ISection>;
}

export {
  resolver,
  type,
  ICourse,
  IGenedCourse,
  IApprovedCourse,
};
