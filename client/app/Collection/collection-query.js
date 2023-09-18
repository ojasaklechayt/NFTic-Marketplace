import { gql } from '@apollo/client';

export const GET_DATA = gql`
  query GetOwnerNFTs($owner: String!){
    nfttransfers(where: {to: $owner}) {
        id
        from
        to
        tokenURI
        price
      }
  }
`;
