import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/52745/nftmarketplace/version/latest',
  cache: new InMemoryCache(),
});

export default client;
