import { IResolver } from '../index';

const resolver: IResolver<any, any> = {
  CourseTableEdges: {
    node(root) {
      return root;
    },
    cursor(root) {
      return root._id;
    },
  },
  CourseTablePage: {
    totalCount(root) {
      return root.length;
    },
    edges(root) {
      return root;
    },
    pageInfo(root) {
      return {
        endCursor: root[root.length - 1]._id,
        hasNextPage: false,
      };
    },
  },
};

export default resolver;
