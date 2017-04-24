import { toObjectID } from 'iridium';
import * as mock from '../../../../courseMock.json';
import { IResolver } from '../index';

const resolver: IResolver<any, any> = {
  User: {
    async coursetables(root, args, { database }) {
      return await database.CourseTable.find({ _id: { $in: root.coursetables.map(toObjectID) } }).toArray();
    },
    async coursetable(root, { id }, { database }) {
      if (root.coursetables.find((ct) => ct._id === id)) {
        return await database.CourseTable.findOne({ _id: id });
      }
      return null;
    },
  },
};

export default resolver;
