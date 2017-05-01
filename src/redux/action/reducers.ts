import { fromJS, List, Map } from 'immutable';
import {
  CLEAR_ACTIONS,
  EXEC_ACTIONS,
  EXEC_ACTIONS_LOADING,
  PUSH_ADD_COURSE_ACTION,
  PUSH_CHANGE_SECTION_ACTION,
  PUSH_REMOVE_COURSE_ACTION,
} from './constants';

export interface IAction {
  type: string;
  target: string;
  to?: string;
}

export type IActionState = Map<string, Map<string, IAction>>;

export const actionReducers = function action(state: IActionState = Map<string, Map<string, IAction>>(),
                                              { type, payload }) {
  if (!(state instanceof Map))   {
    state = fromJS(state);
  }
  if (payload && payload.coursetable && !state.has(payload.coursetable)) {
    state = state.set(payload.coursetable, Map<string, IAction>());
  }
  switch (type) {
    case CLEAR_ACTIONS:
    case EXEC_ACTIONS_LOADING:
    case EXEC_ACTIONS:
      return state.update(payload.coursetable, (v) => v.clear());
    case PUSH_ADD_COURSE_ACTION:
      return state.update(payload.coursetable, (v) => v.set(payload.targetCourse, {
        type: 'ADD',
        target: payload.targetSection,
      }));
    case PUSH_CHANGE_SECTION_ACTION:
      return state.update(payload.coursetable, (v) => v.set(payload.targetCourse, {
        type: 'CHANGE',
        target: payload.targetSection,
        to: payload.toSection,
      }));
    case PUSH_REMOVE_COURSE_ACTION:
      return state.update(payload.coursetable, (v) => v.set(payload.targetCourse, {
        type: 'REMOVE',
        target: payload.targetSection,
      }));
    default: return state;
  }
};
