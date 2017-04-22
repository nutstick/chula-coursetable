const resolver = {
  Course: {
    __resolveType(obj, context, info) {
      if (obj.name) {
        if (obj.type) {
          return 'GenedCourse';
        } else if (obj.faculty) {
          return 'ApprovedCourse';
        } else {
          return 'NormalCourse';
        }
      }

      return null;
    },
  },
};

export default resolver;
