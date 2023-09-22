'use client'
import React, { useContext } from 'react';
import Navbar from '../navbar';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_DATA } from '../Collection/collection-query';
import client from '../../apollo-client';
import { BlockchainConfig } from '../Context/AppConfig';
import { ethers } from 'ethers';

const chunkData = (data, size) => {
  const chunks = [];
  for (let i = 0; i < data.length; i += size) {
    chunks.push(data.slice(i, i + size));
  }
  return chunks;
};

const Explore = () => {
  // Fetch NFT data using GraphQL query
  const { buyingNFT } = useContext(BlockchainConfig);
  const { loading, error, data } = useQuery(GET_ALL_DATA, {
    client,
  });

  if (loading) {
    return <div class="flex flex-col items-center justify-center h-screen">
      <div class="mb-6">
        <div class="text-center text-2xl mt-2">
          <p class="animate-blink inline-block">Loading<span class="animate-dots"></span></p>
        </div>
      </div>
      <div class="text-center text-xs md:text-base">
        <p>Why was the Ethereum developer always calm during network congestion?</p>
        <p>Because they knew patience is a gas fee virtue!</p>
      </div>
    </div>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const nftData = data.nfttransfers || [];

  const rowData = chunkData(nftData, 4);

  const BuyNFT = async (id, price) => {
    try {
      await buyingNFT(id, price);
      window.alert("NFT has been brought successfully!!");
    } catch (error) {
      console.error("Error With Buying: ", error);
      window.alert("Error With Buying");
    }
  }

  return (
    <div>
      <Navbar />
      <div>
        <h1 className="text-3xl md:text-6xl text-center mt-20">Explore</h1>
        <div className="flex flex-wrap justify-center mt-10 mb-10">
          {rowData.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="w-[75vw] md:w-[70vw] md:h-[40vh] lg:w-[80vw] md:px-1 flex flex-col md:flex-row mb-4 justify-center md:space-x-4"
            >
              {row.map((card, cardIndex) => (
                <div
                  key={cardIndex}
                  className="bg-white text-black text-center flex flex-col space-y-3 md:w-1/3 lg:w-1/4 rounded-lg mx-2 my-2 md:mx-0 md:my-0"
                >
                  <img
                    className="w-full h-40 md:h-[25vh] w-full rounded-tl-lg rounded-tr-lg"
                    src={"https://infura-ipfs.io/" + card.tokenURI.slice(16)} // Use tokenURI from GraphQL data
                    alt={"https://infura-ipfs.io/" + card.tokenURI.slice(16)}
                  />
                  <h2 className="font-bold text-xl md:text-2xl">{`NFT#${card.id}`}</h2>
                  <div className="flex flex-row justify-center space-x-4">
                    <p>{ethers.utils.formatEther(card.price)} ETH</p>
                    <p>
                      {ethers.utils.formatEther(card.price) !== '0'
                        ? `${card.to.slice(0, 5)}...${card.to.slice(-5)}`
                        : `${card.from.slice(0, 5)}...${card.from.slice(-5)}`}
                    </p>
                  </div>
                  <div
                    className="bg-gray-400 flex flex-row justify-center items-center rounded-bl-lg rounded-br-lg cursor-pointer hover:bg-gray-600 hover:text-white"
                    onClick={() => BuyNFT(card.id, card.price)} // Replace BuyNFT with your buy function
                  >
                    <p className="py-3 text-2xl">Buy</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
