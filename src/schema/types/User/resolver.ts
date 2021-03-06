import { toObjectID } from 'iridium';
import * as mock from '../../../../courseMock.json';
import { IResolver } from '../index';

const resolver: IResolver<any, any> = {
  User: {
    async coursetables(root, args, { database }) {
      return await database.CourseTable.find({ _id: { $in: root.coursetables.map(toObjectID) } }).toArray();
    },
    async coursetable(root, { id }, { database }) {
      if (root.coursetables.find((ct) => ct === id)) {
        return await database.CourseTable.findOne({ _id: id });
      }
      return null;
    },
    async suggestCourseGroup(root, _, { database }) {
      return await database.CourseGroup.findOne({
        department: root.department,
        faculty: root.faculty,
        year: (new Date()).getFullYear() - root.enrollYear,
      });
    },
  },
};

export default resolver;
