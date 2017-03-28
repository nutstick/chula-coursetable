import gql from 'graphql-tag';
import * as fetch from 'isomorphic-fetch';

const graphqlRequestDeprecatedMessage = `\`graphqlRequest\` has been deprecated.
You should use Apollo: \`client.query({ query, variables...})\` or \`client.mutate()\`
Don't forget to enclose your query to gql\`…\` tag or import *.graphql file.
See docs at http://dev.apollodata.com/core/apollo-client-api.html#ApolloClient\\.query`;

interface IConfig {
  method?: string;
  headers?: {
    [key: string]: string,
  }
  body?: string;
  credentials?: string;
}

interface IOptions {
  skipCache?: boolean;
}

function createGraphqlRequest(apolloClient) {
  return async function graphqlRequest(queryOrString, variables, options: IOptions = {}) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error(graphqlRequestDeprecatedMessage);
    }

    const { skipCache } = options;
    let query = queryOrString;
    if (typeof queryOrString === 'string') {
      query = gql([queryOrString]);
    }

    if (skipCache) {
      return apolloClient.networkInterface.query({ query, variables });
    }

    let isMutation = false;
    if (query.definitions) {
      isMutation = query.definitions.some(definition => definition && (definition.operation === 'mutation'));
    }
    if (isMutation) {
      return apolloClient.mutate({ mutation: query, variables });
    }
    return apolloClient.query({ query, variables });
  };
}

function createFetchKnowingCookie({ cookie }) {
  if (!process.env.BROWSER) {
    return (url, options: IConfig = {}) => {
      const isLocalUrl = /^\/($|[^\/])/.test(url); // eslint-disable-line no-useless-escape

      // pass cookie only for itself.
      // We can't know cookies for other sites BTW
      if (isLocalUrl && options.credentials === 'include') {
        const headers = {
          ...options.headers,
          Cookie: cookie,
        };
        return fetch(url, { ...options, headers });
      }

      return fetch(url, options);
    };
  }

  return fetch;
}

export default function createHelpers(config) {
  const fetchKnowingCookie = createFetchKnowingCookie(config);
  const graphqlRequest = createGraphqlRequest(config.apolloClient);

  return {
    client: config.apolloClient,
    history: config.history,
    fetch: fetchKnowingCookie,
    // @deprecated('Use `client` instead')
    apolloClient: config.apolloClient,
    // @deprecated('Use `client.query()` or `client.mutate()` instead')
    graphqlRequest,
  };
}
