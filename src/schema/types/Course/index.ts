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

export {
  resolver,
  type,
  ICourse,
};
