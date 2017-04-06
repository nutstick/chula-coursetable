import * as React from 'react';
import { errorLoading } from '../../routes';

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default {
  path: '*',
  getComponent (nextState, cb) {
    _import('./NotFound')
      .then(loadModule(cb))
      .catch(errorLoading);
  },
};
