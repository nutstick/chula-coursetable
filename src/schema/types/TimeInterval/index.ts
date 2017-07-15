import resolver from './resolver';
import * as type from './typeDef.gql';

interface ITimeInterval {
  day?: string;
  start?: string;
  end?: string;
}

export {
  resolver,
  type,
  ITimeInterval,
};
