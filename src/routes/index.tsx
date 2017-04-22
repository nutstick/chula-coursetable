import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
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

export default (props) => (
  <Layout>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/coursetable/:id" component={CourseTable} />
      <Route component={NotFound} />
    </Switch>
  </Layout>
);

