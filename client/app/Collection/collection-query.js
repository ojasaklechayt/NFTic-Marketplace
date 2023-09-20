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

export const LIST_DATA = gql`
  query {
    nfttransfers(where:{to: "0x81AA8e38F2dBEedD336534E3FC5C0C7D490b1dc3"}) {
      id
      from
      to
      tokenURI
      price
    }
  }
`;