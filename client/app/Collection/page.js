'use client'
import { useEffect, useState, useRef } from 'react';
import Navbar from '../navbar';
import { ethers } from 'ethers';
import { useQuery } from '@apollo/react-hooks';
import { GET_DATA } from './collection-query'; // Import your GraphQL query
import client from '../../apollo-client';

const Collection = () => {
  const [showListed, setShowListed] = useState(false);
  const [showAmountCardMap, setShowAmountCardMap] = useState({});
  const popupRef = useRef();
  const [ethereumAddress, setEthereumAddress] = useState(null);
  const [datas, setDatas] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    async function fetchEthereumAddress() {
      try {
        if (window.ethereum) {
          await window.ethereum.enable();
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setEthereumAddress(address);
        } else {
          throw new Error('Ethereum wallet not detected');
        }
      } catch (error) {
        console.error('Error fetching Ethereum address:', error.message);
      }
    }

    fetchEthereumAddress();
  }, []);

  const { loading, error, data } = useQuery(GET_DATA, {
    client,
    variables: { owner: ethereumAddress },
  });

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Extract NFTs data from the GraphQL response
  console.log(data);
  const nftTransfers = data.nfttransfers;
  console.log(nftTransfers);

  const GivePrice = async (nft) => {
    // Set the showAmountCardMap state to true for the specific card
    setShowAmountCardMap((prevMap) => ({
      ...prevMap,
      [nft.id]: true,
    }));

    // Get the input value if inputRef.current is defined
    const inputValue = inputRef.current ? inputRef.current.value : '';

    // Create a new data object with the updated value for the specific card
    const updatedData = { id: nft.id, value: inputValue };

    // Update the datas state by replacing the specific card's data or adding it if it doesn't exist
    setDatas((prevData) => {
      const existingIndex = prevData.findIndex((item) => item.id === nft.id);

      if (existingIndex !== -1) {
        // Replace the existing card's data
        prevData[existingIndex] = updatedData;
        return [...prevData]; // Return a new array to trigger a state update
      } else {
        // Add the new card's data to the existing data
        return [...prevData, updatedData];
      }
    });

    // Log the updated datas and showAmountCardMap
    console.log(datas);
    console.log(showAmountCardMap);
  }


  return (
    <div>
      <Navbar />
      <div>
        <h1 className="text-3xl md:text-6xl text-center mt-20">Your Collection</h1>
        <div className="flex flex-row justify-center mt-5 space-x-5">
          <button
            className={`w-40 lg:w-auto bg-gray-400 p-2 px-6 lg:px-10 rounded-full lg:rounded-[25px] hover:bg-gray-500 ${!showListed ? 'bg-gray-500' : ''}`}
            onClick={() => setShowListed(false)}
          >
            <p className="text-center lg:text-left">All NFTs</p>
          </button>
          <button
            className={`w-40 lg:w-auto bg-gray-400 p-2 px-6 lg:px-10 rounded-full lg:rounded-[25px] hover:bg-gray-500 ${showListed ? 'bg-gray-500' : ''}`}
            onClick={() => setShowListed(true)}
          >
            <p className="text-center lg:text-left">Listed NFTs</p>
          </button>
        </div>

        <div className="flex flex-col justify-center mt-10 mb-10">
          {nftTransfers.map((nft, index) => (
            <div key={index} className="flex flex-col md:flex-row justify-center items-center space-x-6 md:space-x-4 mb-5 rounded-lg">
              {/* Render NFT cards using 'nft' data */}
              <div
                className={`bg-white text-black text-center flex flex-col w-60 md:w-0 space-y-3 rounded-lg ${index === 0 ? 'ml-8 md:ml-0 lg:w-1/4' : 'lg:w-1/6'}`}
                style={{ flex: '0 0 20%', minWidth: '50px' }}
              >
                <img
                  className="h-40 md:h-[25vh] w-full rounded-tl-lg rounded-tr-lg"
                  src={nft.tokenURI}
                  alt={fetch(nft.tokenURI).then(response => console.log(response.json()))}
                />

                <h2 className="font-bold text-xl md:text-2xl">{nft.Name}</h2>
                <div className="flex flex-row justify-center space-x-4">
                  <p>{nft.price} ETH</p>
                  <p>{`${nft.to.slice(0, 5)}...${nft.to.slice(-5)}`}</p>
                </div>
                <div
                  className={`bg-gray-400 flex flex-row justify-center items-center rounded-bl-lg rounded-br-lg cursor-pointer hover:bg-gray-600 hover:text-white ${nft.Type === "List" ? 'hover:cursor-pointer' : ''}`}
                  onClick={() => GivePrice(nft)}
                >
                  <p className="py-3 text-2xl">List</p>
                </div>
                {showAmountCardMap[nft.id] === true && (
                  <div ref={popupRef} className="amount-popup fixed top-0 left-0 flex justify-center items-center w-full h-full backdrop-blur-sm">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className='mb-5 flex flex-row justify-end'>
                        <button
                          className='text-xl py-1 px-2 rounded-lg hover:bg-gray-300'
                          onClick={() => {
                            // Create a copy of the showAmountCardMap and set the specific card's state to false
                            setShowAmountCardMap((prevMap) => ({
                              ...prevMap,
                              [nft.id]: false,
                            }));
                          }}
                        >
                          &#10005;
                        </button>
                      </div>
                      <div>
                        <div className='flex flex-row'>
                          <p className='text-md md:text-lg py-1 px-2 md:py-2 md:px-5 rounded-tl-lg rounded-bl-lg text-black bg-gray-500 bg-opacity-80'>Enter Amount</p>
                          <input className='py-1 px-2 w-[110px] md:py-2 md:px-3 md:w-[210px] rounded-tr-lg bg-gray-300 rounded-br-lg bg-white bg-opacity-60' type='text' ref={inputRef} />
                        </div>
                        <button className='mt-5 py-3 px-8 bg-gray-200 hover:bg-gray-400 text-black font-[1.5rem] rounded-lg' onClick={() => GivePrice(nft)}> {/* Pass 'nft' data */}
                          List
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
