import * as BluebirdPromise from 'bluebird';
import * as fs from 'fs';
import { join } from 'path';
import { locales } from '../../../config';

import * as mock from '../../../../courseMock.json';

const resolver = {
  CourseTableSection: {
    course({ course }) {
      return mock[course];
    },
  }
};

export default resolver;
