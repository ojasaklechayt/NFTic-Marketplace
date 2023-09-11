'use client'
import React, { useRef, useState, useEffect, useContext, createContext } from 'react';
import { BlockchainConfig } from "../Context/AppConfig";
import Navbar from '../navbar';
import { ethers } from 'ethers';
import Web3Modal from "web3modal";

const Create = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [nftName, setNftName] = useState('');
    const [walletConnected, setWalletConnected] = useState(false);
    const web3ModalRef = useRef();

    const initializeProvider = async () => {
        try {
            const contractAddress = process.env.ADDRESS_DEPLOYED_TO;
            const contractAbi = process.env.ABI;
            const provider = await getProviderOrSigner(true);
            const contract = new ethers.Contract(contractAddress, contractAbi, provider);
            console.log(contract);
        } catch (error) {
            console.error('Error initializing provider:', error);
        }
    };

    const { uploadToIPFS, createNFT } = useContext(BlockchainConfig);

    useEffect(() => {
        if (typeof window !== 'undefined' && !walletConnected) {
            web3ModalRef.current = new Web3Modal({
                network: "sepolia",
                providerOptions: {},
                disableInjectedProvider: false,
            });
        }
    }, [walletConnected]);

    const getProviderOrSigner = async (needSigner = false) => {
        const provider = await web3ModalRef.current.connect();
        const web3Provider = new providers.Web3Provider(provider);
        const { chainId } = await web3Provider.getNetwork();
        if (chainId !== 11155111) {
            window.alert("Change the network to Mumbai");
            throw new Error("Change network to Mumbai");
        }

        if (needSigner) {
            const signer = web3Provider.getSigner();
            return signer;
        }
        return web3Provider;
    };


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
            return;
        }

        try {
            const imageUrl = await uploadToIPFS(selectedImage);
            const fileUrl = await createNFT({ name: nftName }, imageUrl);
            console.log("NFT created with file URL:", fileUrl);
        } catch (error) {
            console.error("Error creating NFT:", error);
        }
    }


    return (
        <div>
            <Navbar />
            <div>
                <h1 className="text-[1.6rem] md:text-[3rem] text-center mt-20">Create your NFT</h1>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-5 text-black justify-center items-center md:max-w-md mx-auto mt-10'>
                    <label className='relative cursor-pointer'>
                        <input className='hidden' type='file' accept='image/' onChange={handleImageChange} />
                        <div className={`w-40 h-40 ${selectedImage ? 'bg-green-200' : 'bg-gray-100'} hover:bg-gray-300 rounded-lg flex items-center justify-center`}>
                            {selectedImage ? <img src={selectedImage} alt="Selected" className="w-full h-full object-cover rounded-lg" /> : <span className='text-6xl'>+</span>}
                        </div>
                    </label>
                    <div className='flex flex-row'>
                        <p className='text-lg py-1 px-1 md:py-2 md:px-5 rounded-tl-lg rounded-bl-lg text-black bg-white bg-opacity-80'>Enter NFT Name</p>
                        <input className='py-1 px-1 w-[100px] md:py-2 md:px-1 md:w-[200px] rounded-tr-lg rounded-br-lg bg-white bg-opacity-60' type='text' value={nftName} onChange={(e) => setNftName(e.target.value)} />
                    </div>
                    <button type="submit" className='py-3 px-8 bg-white bg-opacity-80 hover:bg-opacity-100 text-black font-[1.5rem] rounded-lg'>
                        Mint
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Create;
