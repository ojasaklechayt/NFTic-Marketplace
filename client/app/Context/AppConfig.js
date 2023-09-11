'use client'
import React, { useContext, useEffect, useState } from "react";
import Web3Modal from "web3modal";
import * as eth from "ethers";
import { NFTStorage, Blob } from "nft.storage";
import { Contract } from "ethers";
import { abi } from './utils'
import mime from 'mime'


export const BlockchainConfig = React.createContext();

export const BlockchainProvider = ({ children }) => {

    // const [currentAccount, setCurrentAccount] = useState("");


    const contr_addr = process.env.ADDRESS_DEPLOYED_TO;
    const NFT_STORAGE_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGY2ODk3NkI1Nzk0M0MwMWFFNTU3OTBEMjg0NWI1NzMyOEMxQTc1RTYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5Mzk5OTAxMzMyNCwibmFtZSI6Ik5GVGljIE1hcmtldHBsYWNlIn0.bWU9yn_DF-zqb-5k9toHERUhrQDqwm72nl_iOCdp9Ks"
    const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

    const provider = new eth.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // const contract = new eth.Contract(contr_addr, abi, signer);


    // const connectWallet = async () => {
    //     if (!window.ethereum) return alert("Please install MetaMask.");
    //     const accounts = await window.ethereum.request({ //ethereum is a property that represents the Ethereum provider (like MetaMask)
    //         method: "eth_requestAccounts",
    //     });
    //     console.log("Connected")
    //     setCurrentAccount(accounts[0]);
    //     window.location.reload(); // ensures that other parts of the application are aware of the newly connected Ethereum account.
    // };

    // const checkIfWalletIsConnect = async () => {
    //     if (!window.ethereum) return alert("Please install MetaMask.");
    //     const accounts = await window.ethereum.request({ method: "eth_accounts" });
    //     if (accounts.length) {
    //         setCurrentAccount(accounts[0]);
    //         console.log("Connected")
    //     } else {
    //         console.log("No accounts found");
    //     }
    // };

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
                window.alert(imageUrl);
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
            console.log(url);
        } catch (error) {
            console.log("Error uploading to create nft", error);
        }
        return fileUrl;
    };

    // const createSale = async (url, formInputPrice) => {
    //     const price = eth.utils.parseUnits(formInputPrice, "ether");
    //     console.log(price)
    //     try {
    //         const listingPrice = await contract.getListingPrice(); // fees charged by the marketplace to allow ppl upload the nft
    //         console.log("Listing price - ", listingPrice)
    //         const transaction = await contract.createToken(url, price, {
    //             value: listingPrice.toString(),
    //         })
    //         console.log(transaction)
    //         await transaction.wait();
    //         console.log(transaction);

    //     } catch (error) {
    //         console.log("An error occured at the create sale function - ", error)
    //     }
    // };

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
        <BlockchainConfig.Provider value={{ uploadToIPFS, createNFT }}>{children}</BlockchainConfig.Provider>
    );
};