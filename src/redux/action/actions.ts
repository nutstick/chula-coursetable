import * as COURSEINACTIONQUERY from '../../routes/CourseTable/CourseInActionQuery.gql';
import * as COURSETABLEQUERY from '../../routes/CourseTable/CourseTableQuery.gql';
import * as ADDCOURSE from './AddCourseMutation.gql';
import * as CHANGESECTION from './ChangeSectionMutation.gql';
import {
  CLEAR_ACTIONS,
  EXEC_ACTIONS,
  EXEC_ACTIONS_LOADING,
  PUSH_ADD_COURSE_ACTION,
  PUSH_CHANGE_SECTION_ACTION,
  PUSH_REMOVE_COURSE_ACTION,
} from './constants';
import * as REMOVECOURSE from './RemoveCourseMutation.gql';

export function clearActions(coursetable) {
  return {
    type: CLEAR_ACTIONS,
    payload: {
      coursetable,
    },
  };
}

export function execActions(coursetable) {
  return async (dispatch, getState, { client }) => {
    const actions = getState().action.get(coursetable);
    dispatch({
      type: EXEC_ACTIONS_LOADING,
      payload: {
        coursetable,
      },
    });

    const mutations = actions.map((a) => {
      switch (a.type) {
        case 'ADD':
          const section = {
            color: 'GREEN',
            section: a.target,
          };
          return client.mutate({
            mutation: ADDCOURSE,
            variables: { coursetable, section },
          });
        case 'REMOVE':
          return client.mutate({
            mutation: REMOVECOURSE,
            variables: { coursetable, section: a.target },
          });
        case 'CHANGE':
          return client.mutate({
            mutation: CHANGESECTION,
            variables: { coursetable, section: a.target, to: a.to },
          });
        default:
          return false;
      }
    }).toJS();
    console.log('m', mutations);
    const result = await Promise.all(mutations);
    console.log('r', result);

    dispatch({
      type: EXEC_ACTIONS,
      payload: {
        coursetable,
      },
    });
  };
}

export function pushAddCourseAction(coursetable, targetSection) {
  return {
    type: PUSH_ADD_COURSE_ACTION,
    payload: {
      coursetable,
      targetSection,
    },
  };
}

export function pushChangeSectionAction(coursetable, targetSection, toSection) {
  return {
    type: PUSH_CHANGE_SECTION_ACTION,
    payload: {
      coursetable,
      targetSection,
      toSection,
    },
  };
}

export function pushRemoveCourseAction(coursetable, targetSection) {
  return {
    type: PUSH_ADD_COURSE_ACTION,
    payload: {
      coursetable,
      targetSection,
    },
  };
}
