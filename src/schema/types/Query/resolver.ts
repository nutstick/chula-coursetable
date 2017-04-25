import * as BluebirdPromise from 'bluebird';
import * as fs from 'fs';
import { join } from 'path';
import * as course from '../../../../courseMock.json';
import * as mock from '../../../../mockData.json';
import { locales } from '../../../config';
import { IResolver } from '../index';

const CONTENT_DIR = join(__dirname, './messages');

const readFile = BluebirdPromise.promisify(fs.readFile);

const resolver: IResolver<any, any> = {
  Query: {
    helloworld() {
      return 'Hello Word';
    },
    async me(_, __, { database, user }) {
      if (user && user._id) {
        return await database.User.findOne({ _id: user._id });
      }
      return null;
    },
    async search(_, { search }, { database }) {
      if (search) {
        const courses = await database.Course.find().toArray();
        return courses.map((c) => c.toJSON());
      }
      return null;
    },
    async courses(_, { ids }, { database }) {
      const sections = ids && await database.Section.find({ _id: { $in: ids } }).toArray();
      sections.map(async (section) => {
        const course = await database.Course.findOne({ section: section._id });
        return {
          section,
          course,
        };
      });
    },
    async intl(_, { locale }) {
      if (!locales.includes(locale)) {
        throw new Error(`Locale '${locale}' not supported`);
      }

      let localeData;
      try {
        localeData = await readFile(join(CONTENT_DIR, `${locale}.json`));
      } catch (err) {
        if (err.code === 'ENOENT') {
          throw new Error(`Locale '${locale}' not found`);
        }
      }
      return JSON.parse(localeData);
    },
  },
};

export default resolver;
