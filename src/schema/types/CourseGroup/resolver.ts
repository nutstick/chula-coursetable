import { toObjectID } from 'iridium';
import { IResolver } from '../index';

const resolver: IResolver<any, any> = {
  CourseGroupEdges: {
    node(root) {
      return root;
    },
    cursor(root) {
      return root._id;
    },
  },
  CourseGroupPage: {
    totalCount(root) {
      return root.length;
    },
    edges(root) {
      return root;
    },
    pageInfo(root) {
      return {
        endCursor: root.length > 0 && root[root.length - 1]._id,
        hasNextPage: false,
      };
    },
  },
  CourseGroup: {
    async courses({ courses }, _, { database }) {
      return await database.Course.find({ _id: { $in: courses.map(toObjectID) } }).toArray();
    },
  },
};

export default resolver;
