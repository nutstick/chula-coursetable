import { IResolver } from '../index';

const resolver: IResolver<any, any> = {
  SearchResultEdges: {
    node(root) {
      return root;
    },
    cursor(root) {
      return root._id;
    },
  },
  SearchResultPage: {
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
  SearchResult: {
    __resolveType({ courseID, type, faculty }, context, info) {
      if (courseID) {
        if (type === 2) {
          return 'GenedCourse';
        } else if (type === 3) {
          return 'ApprovedCourse';
        }
        return 'NormalCourse';
      }
      return 'CourseGroup';
    },
  },
};

export default resolver;
