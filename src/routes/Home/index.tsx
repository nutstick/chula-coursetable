import * as fetch from 'isomorphic-fetch';
import * as React from 'react';
import { injectAsyncReducer } from '../../redux/reducers';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default {
  path: '/',
  getComponent (nextState, cb) {
    console.log('222')
    _import('./Home')
      .then(loadModule(cb))
      .catch(errorLoading);
  },
  async action() {
    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{news{title,link,pubDate,content}}',
      }),
      credentials: 'include',
    });
    const { data } = await resp.json();
    if (!data || !data.news) {
      throw new Error('Failed to load the news feed.');
    }

    return {
      title: 'React Starter Kit',
      // component: <Layout><Home news={data.news} /></Layout>,
    };
  },
};
