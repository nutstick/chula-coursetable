import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import Layout from '../components/Layout';
import CourseTable from './CourseTable';
import Home from './Home';
import NotFound from './NotFound';

export const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err);
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default (store) => ({
  component: Layout,
  childRoutes: [
    Home,
    CourseTable,
    NotFound,
  ],
});
