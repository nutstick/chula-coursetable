import {
  LEFT_SIDEBAR_EXPAND,
  RIGHT_SIDEBAR_EXPAND,
  SET_FLOATING_BUTTON_ACTIVE,
  SET_FLOATING_BUTTON_DEACTIVE,
  SET_FLOATING_BUTTON_TARGET,
  SET_SIDEBAR_EXPAND,
} from './constants';

export interface IUIState {
  floatingButton: {
    to: string,
    icon: string,
    show: boolean,
  };
  sidebar: {
    expand: string;
  };
}

export const uiReducers = function ui(state: IUIState = null, action) {
  if (state === null) {
    return {
      floatingButton: {
        to: null,
        icon: null,
        show: false,
      },
      sidebar: {
        expand: 'left',
      },
    };
  }

  switch (action.type) {
    case SET_FLOATING_BUTTON_ACTIVE: {
      return {
        ...state,
        floatingButton: {
          show: true,
          to: state.floatingButton.to,
          icon: state.floatingButton.icon,
        },
      };
    }

    case SET_FLOATING_BUTTON_DEACTIVE: {
      return {
        ...state,
        floatingButton: {
          show: false,
          to: state.floatingButton.to,
          icon: state.floatingButton.icon,
        },
      };
    }

    case SET_FLOATING_BUTTON_TARGET: {
      const { url, icon } = action.payload;
      return {
        ...state,
        floatingButton: {
          show: state.floatingButton.show,
          to: url,
          icon,
        },
      };
    }

    case SET_SIDEBAR_EXPAND: {
      return {
        ...state,
        sidebar: {
          expand: action.payload,
        },
      };
    }

    case LEFT_SIDEBAR_EXPAND: {
      return {
        ...state,
        sidebar: {
          expand: state.sidebar.expand === 'right' ? 'both' : 'left',
        },
      };
    }

    case RIGHT_SIDEBAR_EXPAND: {
      return {
        ...state,
        sidebar: {
          expand: state.sidebar.expand === 'left' ? 'both' : 'right',
        },
      };
    }

    default: {
      return state;
    }
  }
};
