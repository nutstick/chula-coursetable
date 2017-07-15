import resolver from './resolver';
import * as type from './typeDef.gql';

interface ITeacher {
  _id: string;
  name?: string;
  abbreviated?: string;
  shortDescription?: string;
}

export {
  resolver,
  type,
  ITeacher,
};
