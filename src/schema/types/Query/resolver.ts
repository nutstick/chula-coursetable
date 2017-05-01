import * as BluebirdPromise from 'bluebird';
import * as fs from 'fs';
import { join } from 'path';
import * as course from '../../../../courseMock.json';
import * as mock from '../../../../mockData.json';
import { locales } from '../../../config';
import { Course } from '../../models/Course';
import { CourseGroup } from '../../models/CourseGroup';
import { IResolver } from '../index';

const CONTENT_DIR = join(__dirname, './messages');

const readFile = BluebirdPromise.promisify(fs.readFile);

type SearchResult = Course | CourseGroup;

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
      if (!search) {
        return null;
      }
      const courses = await database.Course.find({ name: { $regex: search, $options: 'i' } }).toArray();
      const coursegroups = await database.CourseGroup.find({ name: { $regex: search, $options: 'i' } }).toArray();

      const searchResult: SearchResult[] = [];
      // return courses.map((c) => c.toJSON()).concat(coursegroups.map((cg) => cg.toJSON()));
      return searchResult.concat(courses).concat(coursegroups);
    },
    async courses(_, { sectionIDs }, { database }) {
      return sectionIDs && sectionIDs.map((id) => ({
        section: id,
      }));
    },
    async coursegroup(_, { id }, { database }) {
      return id && await database.CourseGroup.findOne({ _id: id });
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
