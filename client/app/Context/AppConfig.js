'use client'
import React, { useContext, useEffect, useState } from "react";
import Web3Modal from "web3modal";
import * as eth from "ethers";
import { NFTStorage, Blob } from "nft.storage";
import { Contract } from "ethers";
import { abi, address, nftstoract } from './utils'
import mime from 'mime'


export const BlockchainConfig = React.createContext();

export const BlockchainProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("Connect Wallet");
    const [errorMessage, setErrorMessage] = useState(null);


    const contr_addr = address;
    const NFT_STORAGE_TOKEN = nftstoract;
    const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
    let provider, signer, contract;
    if (typeof window !== "undefined" && window.ethereum) {
        provider = new eth.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        contract = new eth.Contract(contr_addr, abi, signer);
    }

    // const provider = new eth.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    // const contract = new eth.Contract(contr_addr, abi, signer);
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

    const createNFT = async (formInput, fileUrl) => {
        console.log(fileUrl);
        const { name, videoUrl } = formInput;
        if (!name || !fileUrl) return;
        const metadata = JSON.stringify({
            name,
            image: fileUrl,
            properties: {
                video: videoUrl,
            },
        });
        let url = "";
        try {
            const metadataBlob = new Blob([JSON.stringify(metadata)], { type: "application/json" });
            const cid = await client.storeBlob(metadataBlob);
            url = "https://ipfs.io/ipfs/" + cid;
            await mintNFT(url);
        } catch (error) {
            console.log("Error uploading to create nft", error);
        }
        window.alert("NFT Created Successfully!!");
    };

    const mintNFT = async (url) => {
        try {
            const transaction = await contract.createNFT(url);
        } catch (error) {
            console.error("There's error minting the NFTs : ", error);
        }
    };


    // const fetchNFTs = async (setLoading) => {
    //     setLoading(true);
    //     const data = await contract.fetchMarketItems();
    //     const items = await Promise.all(
    //         data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
    //             const tokenURI = await contract.tokenURI(tokenId);
    //             const {
    //                 data: { image, name, description },
    //             } = await axios.get(tokenURI);
    //             const price = eth.utils.formatUnits(
    //                 unformattedPrice.toString(),
    //                 "ether"
    //             );

    //             image.replace("https:ipfs.io", "https://infura-ipfs.io");
    //             console.log(image);

    //             return {
    //                 price,
    //                 tokenId: tokenId.toNumber(),
    //                 seller,
    //                 owner,
    //                 image,
    //                 name,
    //                 description,
    //                 tokenURI,
    //             };
    //         })
    //     );
    //     return items;
    // };

    // useEffect(() => {
    //     checkIfWalletIsConnect();
    // }, []);
    return (
        <BlockchainConfig.Provider value={{ uploadToIPFS, createNFT, connectWallet, mintNFT, currentAccount }}>{children}</BlockchainConfig.Provider>
    );
};