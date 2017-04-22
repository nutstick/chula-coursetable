import * as fetch from 'isomorphic-fetch';
import * as React from 'react';
import { Route } from 'react-router';
import AsyncComponents from '../../components/AsyncComponents';
import { injectAsyncReducer } from '../../redux/reducers';
import { errorLoading } from '../../routes';

export default AsyncComponents(() => _import('./Home'));
