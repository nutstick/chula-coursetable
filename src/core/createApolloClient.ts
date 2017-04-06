import ApolloClient from 'apollo-client';

export default function createApolloClient(options?) {
  return new ApolloClient(Object.assign({}, {
    dataIdFromObject: (result) => {
      if (result.id && result.__typename) {
        return result.__typename + result.id;
      }
      return null;
    },
    queryDeduplication: true,
    reduxRootSelector: (state) => state.apollo,
    // shouldBatch: true,
  }, options));
}
