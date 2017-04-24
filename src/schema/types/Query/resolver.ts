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
    me(root, args, { database, user }) {
      try {
        return database.User.findOne({ _id: user._id });
      } catch (err) {
        console.log(err);
        return null;
      }
    },
    async courses(_, { search }, { database }) {
      if (search) {
        const courses = await database.Course.find().toArray();
        return courses.map((c) => c.toJSON());
      }
      return null;
    },
    async intl({ request }, { locale }) {
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
