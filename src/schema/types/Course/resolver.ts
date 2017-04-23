const resolver = {
  Course: {
    __resolveType({ type, faculty }, context, info) {
      if (type) {
        return 'GenedCourse';
      } else if (faculty) {
        return 'ApprovedCourse';
      }
      return 'NormalCourse';
    }
  }
};

export default resolver;
