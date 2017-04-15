import * as React from 'react';
import { injectAsyncReducer } from '../../redux/reducers';
import { errorLoading } from '../../routes';

const loadModule = (cb) => async (componentModule) => {
  _import('../../components/CourseTable')
    .then(() => {
      cb(null, componentModule.default);
    })
    .catch(errorLoading);
};

export default {
  path: 'coursetable/:id',
  getComponent(nextState, cb) {
    _import('./CourseTablePage')
      .then(loadModule(cb))
      .catch(errorLoading);
  },
};
