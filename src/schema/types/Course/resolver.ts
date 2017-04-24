import { IResolver } from '../index';

const resolver: IResolver<any, any> = {
  Course: {
    __resolveType({ type, faculty }, context, info) {
      if (type) {
        return 'GenedCourse';
      } else if (faculty) {
        return 'ApprovedCourse';
      }
      return 'NormalCourse';
    },
  },
  NormalCourse: {
    async sections(root, args, { database }) {
      return await root.sections.map((s) => database.Section.findOne({ _id: s }));
    },
  },
  GenedCourse: {
    async sections(root, args, { database }) {
      const sections = await Promise.all(root.sections.map((s) => database.Section.findOne({ _id: s })));
      return sections;
    },
  },
};

export default resolver;
