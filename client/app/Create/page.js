'use client'
import React, { useRef, useState, useEffect, useContext, createContext } from 'react';
import { BlockchainConfig } from "../Context/AppConfig";
import Navbar from '../navbar';
import Loader from '../Loader';

const Create = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [nftName, setNftName] = useState('');
    const [walletConnected, setWalletConnected] = useState(false);
    const web3ModalRef = useRef();

    const { uploadToIPFS, createNFT, mintingNFT, setMintingNFT } = useContext(BlockchainConfig);


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setSelectedImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedImage || !nftName) {
            console.error("Please select an image and enter an NFT name.");
            alert("Please select an image and enter an NFT name.");
            return;
        }

        try {
            setMintingNFT("Minting");
            await createNFT({ name: nftName }, selectedImage);
            setMintingNFT("Minted");
        } catch (error) {
            console.error("Error creating NFT:", error);
        }
    }


    return (
        <div>
            <Navbar />
            <div>
                <h1 className="text-[1.6rem] md:text-[3rem] text-center mt-20">Create your NFT</h1>
                {mintingNFT === 'Minting' ? (<Loader />) : (
                    <form onSubmit={handleSubmit} className='flex flex-col space-y-5 text-black justify-center items-center md:max-w-md mx-auto mt-10'>
                        <label className='relative cursor-pointer'>
                            <input className='hidden' type='file' accept='image/' onChange={handleImageChange} />
                            <div className={`w-40 h-40 ${selectedImage ? 'bg-green-200' : 'bg-gray-100'} hover:bg-gray-300 rounded-lg flex items-center justify-center`}>
                                {selectedImage ? <img src={selectedImage} alt="Selected" className="w-full h-full object-cover rounded-lg" /> : <span className='text-6xl'>+</span>}
                            </div>
                        </label>
                        <div className='flex flex-row'>
                            <p className='text-sm py-2 px-1 md:py-2 md:px-5 rounded-tl-lg rounded-bl-lg text-black bg-white bg-opacity-80'>Enter NFT Name</p>
                            <input className='py-1 px-1 w-[100px] md:py-2 md:px-1 md:w-[200px] rounded-tr-lg rounded-br-lg bg-white bg-opacity-60' type='text' value={nftName} onChange={(e) => setNftName(e.target.value)} />
                        </div>
                        <button type="submit" className='py-3 px-8 bg-white bg-opacity-80 hover:bg-opacity-100 text-black font-[1.5rem] rounded-lg'>
                            Mint
                        </button>
                    </form>)
                }
            </div >
        </div >
    );
}

export default Create;
