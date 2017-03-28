import gql from 'graphql-tag';
import {
  SET_LOCALE_ERROR,
  SET_LOCALE_START,
  SET_LOCALE_SUCCESS,
} from './constants';

const query = gql`
  query ($locale:String!) {
    intl (locale:$locale) {
      id
      message
    }
  }
`;

export function setLocale({ locale }) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: SET_LOCALE_START,
      payload: {
        locale,
      },
    });

    try {
      const { data } = await client.query({ query, variables: { locale }});
      const messages = data.intl.reduce((msgs, msg) => {
        msgs[msg.id] = msg.message; // eslint-disable-line no-param-reassign
        return msgs;
      }, {});
      dispatch({
        type: SET_LOCALE_SUCCESS,
        payload: {
          locale,
          messages,
        },
      });

      // remember locale for every new request
      if (process.env.BROWSER) {
        const maxAge = 3650 * 24 * 3600; // 10 years in seconds
        document.cookie = `lang=${locale};path=/;max-age=${maxAge}`;
      }
    } catch (error) {
      dispatch({
        type: SET_LOCALE_ERROR,
        payload: {
          locale,
          error,
        },
      });
      return false;
    }

    return true;
  };
}
