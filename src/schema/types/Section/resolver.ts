import * as BluebirdPromise from 'bluebird';
import * as fs from 'fs';
import { join } from 'path';
import { locales } from '../../../config';
import { IResolver } from '../index';

import * as mock from '../../../../courseMock.json';

const resolver: IResolver<any, any> = {
  SectionEdges: {
    node(root) {
      return root;
    },
    cursor(root) {
      return root._id;
    },
  },
  SectionPage: {
    totalCount(root) {
      return root.length;
    },
    edges(root) {
      return root;
    },
    pageInfo(root) {
      return {
        endCursor: root[root.length - 1]._id,
        hasNextPage: false,
      };
    },
  },
  Section: {
    type(root) {
      console.log(root);
      switch (root.type) {
        case 1: return 'NORMAL';
        case 2: return 'GENED';
        case 3: return 'APPROVED';
        default: return 'NORMAL';
      }
    },
  },
  CourseTableSection: {
    course({ course }) {
      return mock[course];
    },
  },
};

export default resolver;
