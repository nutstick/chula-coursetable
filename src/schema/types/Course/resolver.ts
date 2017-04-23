const resolver = {
  Course: {
    __resolveType({ type, faculty }, context, info) {
      if (type) {
        return 'GenedCourse';
      } else if (faculty) {
        return 'ApprovedCourse';
      }
      return 'NormalCourse';
    },
    sections() {
      return [{
        _id: 's1',
        timeIntervals: [
          {
            day: 'MONDAY',
            start: '9:30',
            end: '11:00',
          }, {
            day: 'WEDNESDAY',
            start: '9:30',
            end: '11:00',
          },
        ],
        type: 'NORMAL',
      }];
    },
  },
};

export default resolver;
