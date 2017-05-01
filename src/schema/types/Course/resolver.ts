import { Section } from '../../models/Section';
import { IResolver } from '../index';

const resolver: IResolver<any, any> = {
  Course: {
    __resolveType({ type, faculty }, context, info) {
      if (type === 2) {
        return 'GenedCourse';
      } else if (type === 3) {
        return 'ApprovedCourse';
      }
      return 'NormalCourse';
    },
  },
  NormalCourse: {
    async sections(root, args, { database }) {
      const sections = await Promise.all<Section>(root.sections.map((s) => database.Section.findOne({ _id: s })));
      return sections;
    },
  },
  GenedCourse: {
    async sections(root, args, { database }) {
      const sections = await Promise.all<Section>(root.sections.map((s) => database.Section.findOne({ _id: s })));
      return sections;
    },
  },
};

export default resolver;
