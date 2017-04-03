import * as React from 'react';

const title = 'Page not found';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

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
