import { IResolver } from '../index';

const resolver: IResolver<any, any> = {
  Mutation: {
    createCourseTable() {
      return 1;
    },
    async createCourse(_, { type, genedType, approvedFaculty, approvedDepartment, ...args },
                       { database }) {
      let typeNumber = 1;
      switch (type) {
        case 'NORMAL':
          typeNumber = 1;
          break;
        case 'GENED':
          typeNumber = 2;
          break;
        case 'APPROVED':
          typeNumber = 3;
          break;
      }

      return await database.Course.insert({
        type: typeNumber,
        gened: {
          type: genedType,
        },
        approve: {
          faculty: approvedFaculty,
          department: approvedDepartment,
        },
        ...args,
      });
    },
    async createSection(_, { type, ...args }, { database }) {
      let typeNumber = 1;
      switch (type) {
        case 'NORMAL':
          typeNumber = 1;
          break;
        case 'GENED':
          typeNumber = 2;
          break;
        case 'APPROVED':
          typeNumber = 3;
          break;
      }

      console.log(args.timeIntervals);

      return await database.Section.insert({
        type: typeNumber,
        ...args,
      });
    },
  },
};

export default resolver;
