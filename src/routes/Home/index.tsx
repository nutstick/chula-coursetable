import * as fetch from 'isomorphic-fetch';
import * as React from 'react';
import { injectAsyncReducer } from '../../redux/reducers';
import { errorLoading } from '../../routes';

const loadModule = (cb) => async (componentModule) => {
  cb(null, componentModule.default);
};

export default {
  path: '/',
  getComponent (nextState, cb) {
    _import('./Home')
      .then(loadModule(cb))
      .catch(errorLoading);
  },
};
