import { ITeacher } from '../Teacher';
import { ITimeInterval } from '../TimeInterval';
import resolver from './resolver';
import * as type from './typeDef.gql';

interface ISection {
  _id: string;
  sectionNo?: number;
  timeIntervals?: ITimeInterval[];
  teachers?: ITeacher[];
  building?: string;
  classroom?: string;
  type?: string;
}

export {
  resolver,
  type,
  ISection,
};
