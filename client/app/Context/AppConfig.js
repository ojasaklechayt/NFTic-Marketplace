'use client'
import React, { useContext, useEffect, useState } from "react";
import Web3Modal from "web3modal";
import * as eth from "ethers";
import { NFTStorage, Blob } from "nft.storage";
import { Contract, ethers } from "ethers";
import { abi, address, nftstoract } from './utils'
import mime from 'mime'


export const BlockchainConfig = React.createContext();

export const BlockchainProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("Connect Wallet");
    const [errorMessage, setErrorMessage] = useState(null);
    const [mintingNFT, setMintingNFT] = useState("Minted");


    const contr_addr = address;
    const NFT_STORAGE_TOKEN = nftstoract;
    const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
    let provider, signer, contract;
    if (typeof window !== "undefined" && window.ethereum) {
        provider = new eth.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        contract = new eth.Contract(contr_addr, abi, signer);
    }

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                window.alert("Please install MetaMask.");
            }

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            setCurrentAccount(accounts[0]);

            window.ethereum.on("accountsChanged", (newAccounts) => {
                if (newAccounts.length === 0) {
                    setCurrentAccount("Connect Wallet");
                }
            });

        } catch (error) {
            console.error(`Error connecting wallet: ${error.message}`);
            setErrorMessage(error.message);
        }
    }

    const uploadToIPFS = async (file) => {
        // console.log(file);
        const filename = "nft.jpg";
        const newFile = new File([file], filename);
        // console.log(newFile);
        try {
            const metadata = await client.store({
                name: "ABC",
                description: "ABC",
                image: newFile,
            });
            if (metadata && metadata.data && metadata.data.image instanceof URL) {
                const imageUrl = metadata.data.image.href;
                return imageUrl;
            } else {
                console.error("Metadata or image is undefined:", metadata);
            }
        } catch (error) {
            console.error("Error uploading to file : ", error);
        }
    };

    const createNFT = async (formInput, file) => {
        // console.log(fileUrl);
        const imageUrl = await uploadToIPFS(file);
        const { name, videoUrl } = formInput;
        if (!name || !imageUrl){
            console.error("Name or Image URL missing");
        }
        const metadata = JSON.stringify({
            name: name,
            image: imageUrl,
            properties: {
                video: videoUrl,
            },
        });
        let url = "";
        try {
            const metadataBlob = new Blob([JSON.stringify(metadata)], { type: "application/json" });
            const cid = await client.storeBlob(metadataBlob);
            console.log(cid);
            url = `https://ipfs.io/ipfs/${cid}`;
            console.log(url);
            await mintNFT(url);
        } catch (error) {
            console.log("Error uploading to create nft", error);
        }
    };

    const mintNFT = async (url) => {
        try {
            
            const transaction = await contract.createNFT(url);
            await transaction.wait();
            console.log("Transaction confirmed:", transaction.hash);
            window.alert("NFT Minted Successfully!!");
        } catch (error) {
            console.error("There's error minting the NFTs : ", error);
            window.alert("NFT not minted , Error!!");
        }
    };

    const listNFT = async(id,price) => {
        try {
            if(price === 0){
                window.alert("NFT price can not be 0");
            }
            const priceInEth = ethers.utils.parseEther(price.toString());
            const listing = await contract.listNFT(id,priceInEth);
            await listing.wait();
            console.log("Listing Successfully: ", listing.hash);
            window.alert("Your NFT has been listed for sale successfully")
        } catch (error) {
            console.error("Error listing NFTs : ", error);
            window.alert("Error listing NFT");
        }
    }

    const cancelListing = async(id) => {
        try {
            const cancel = await contract.cancelListing(id);
            await cancel.wait();
            console.log("Cancelling Successful: ", cancel.hash);
        } catch (error) {
            console.error("Error Cancelling Listing : ", error);
            window.alert("Error Cancelling Listing");
        }
    }

    const buyingNFT = async(id, price) => {
        try {
            const Price = ethers.utils.formatEther(price);
            const buying = await contract.buyNFT(id, {value: ethers.utils.parseEther(Price)});
            await buying.wait();
            console.log("Bought Successfully: ", buying.hash);
        } catch (error) {
            console.error("Error Buying NFT: ", error);
            window.alert("Error Buying NFT");
        }
    }
    return (
        <BlockchainConfig.Provider value={{ uploadToIPFS, createNFT, connectWallet, mintNFT, currentAccount, mintingNFT, setMintingNFT, listNFT, cancelListing, buyingNFT }}>{children}</BlockchainConfig.Provider>
    );
};