import { IApprovedCourse, ICourse, IGenedCourse } from '../Course';
import resolver from './resolver';
import * as type from './typeDef.gql';

type ISearchResult = ICourse | IGenedCourse | IApprovedCourse;

export {
  resolver,
  type,
  ISearchResult,
};
