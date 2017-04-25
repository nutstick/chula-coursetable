import {
  CLEAR_ACTIONS,
  EXEC_ACTIONS,
  PUSH_ADD_COURSE_ACTION,
  PUSH_CHANGE_SECTION_ACTION,
  PUSH_REMOVE_COURSE_ACTION,
} from './constants';

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
    dispatch({
      type: EXEC_ACTIONS,
      payload: {
        coursetable,
      },
    });

    console.log(getState);
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
