import { IResolver } from '../index';

const resolver: IResolver<any, any> = {
  Mutation: {
    async createCourseTable(_, __, { database, user }) {
      const coursetable = await database.CourseTable.insert({
        owner: user._id,
        courses: [],
      });
      await database.User.update({ _id: user._id }, {
        $push: {
          coursetables: coursetable._id,
        },
      });

      return coursetable;
    },
    async addCourseToCourseTable(_, { coursetable, section }, { database }) {
      return await database.CourseTable.update({ _id: coursetable }, {
        $push: {
          courses: section,
        },
      });
    },
    async addCoursesToCourseTable(_, { coursetable, sections }, { database }) {
      return await database.CourseTable.update({ _id: coursetable }, {
        $addToSet: {
          courses: {
            $each: sections,
          },
        },
      });
    },
    async removeCourseFromCourseTable(_, { coursetable, section }, { database }) {
      return await database.CourseTable.update({ _id: coursetable }, {
        $pull: {
          courses: {
            section,
          },
        },
      });
    },
    async changeSectionInCourseTable(_, { coursetable, section, to }, { database }) {
      return await database.CourseTable.update({ '_id': coursetable, 'courses.section': section }, {
        $set: {
          'courses.$.section': to,
        },
      });
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
