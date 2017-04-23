import * as BluebirdPromise from 'bluebird';
import * as fs from 'fs';
import { join } from 'path';
import { locales } from '../../../config';

import * as course from '../../../../courseMock.json';
import * as mock from '../../../../mockData.json';

const CONTENT_DIR = join(__dirname, './messages');

const readFile = BluebirdPromise.promisify(fs.readFile);

const resolver = {
  Query: {
    helloworld() {
      return 'Hello Word';
    },
    me(root, args, context) {
      return mock.users['58e27f900000000000000000'];
    },
    async courses(_, { search }, { database }) {
      return database.Courses.get();
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
