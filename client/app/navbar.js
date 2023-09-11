'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import the useRouter hook
import { ethers } from 'ethers';

const Navbar = () => {
    const router = useRouter(); // Initialize the router

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [account, setAccount] = useState('Connect Wallet');
    const [ethereum, setEthereum] = useState(null);
    const [provider, setProvider] = useState(null);

    const handleWalletLockedRedirection = () => {
        const currentPath = router.pathname;
        if (currentPath === '/Collection' || currentPath === '/Create') {
            router.push('/');
        } else {
            window.location.reload();
        }
    };

    useEffect(() => {
        const initializeEthereum = async () => {
            if (window.ethereum) {
                setEthereum(window.ethereum);
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                setProvider(provider);
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                    if (accounts.length > 0) {
                        setAccount(`${accounts[0].slice(0, 5)}...${accounts[0].slice(-3)}`);
                        console.log(account);
                    }
                } catch (error) {
                    console.log(error);
                }

                // Listen for Metamask account changes
                window.ethereum.on('accountsChanged', handleAccountsChanged);
            }
        };

        initializeEthereum();

        return () => {
            if (ethereum) {
                ethereum.removeAllListeners('accountsChanged', handleAccountsChanged);
            }
        };
    }, []);

    const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
            setAccount(`${accounts[0].slice(0, 5)}...${accounts[0].slice(-3)}`);
        } else {
            setAccount('Connect Wallet');

            handleWalletLockedRedirection();
        }
        // Reload the page when Metamask gets locked
    };


    const connectWallet = async () => {
        try {
            if (ethereum) {
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                if (accounts.length > 0) {
                    setAccount(`${accounts[0].slice(0, 5)}...${accounts[0].slice(-3)}`);
                } else {
                    setAccount('Connect Wallet');
                    handleWalletLockedRedirection();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <div className="px-5 md:bg-[#D9D9D9] md:bg-opacity-20 h-[50px] flex flex-row items-center relative">
                <div className="hidden md:flex flex-row space-x-10 lg:space-x-20 cursor-pointer">
                    <Link href="/"><p className="hover:underline opacity-80">Home</p></Link>
                    <Link href="/Explore"><p className="hover:underline opacity-80">Explore</p></Link>
                    {account !== 'Connect Wallet' && (
                        <>
                            <Link href="/Collection"><p className="hover:underline opacity-80">Your Collection</p></Link>
                            <Link href="/Create"><p className="hover:underline opacity-80">Create</p></Link>
                        </>
                    )}
                </div>
                <div className="hidden ml-auto md:block">
                    <button onClick={connectWallet} className="text-black bg-white text-sm font-bold p-[8px] rounded-lg bg-opacity-40">
                        <p>
                            {account === "Connect Wallet"
                                ? 'Connect Wallet'
                                : `${account.slice(0, 5)}...${account.slice(account.length - 3)}`}
                        </p>
                    </button>
                </div>
                <div className="ml-auto md:hidden">
                    <button
                        className="bg-white text-black text-sm font-bold p-[8px] rounded-lg bg-opacity-40"
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? 'Close Menu' : 'Menu'}
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden absolute right-0 top-14 mr-5 bg-[#D9D9D9] p-4 rounded-lg shadow-lg space-y-2">
                    <Link href="/"><p className="text-black hover:underline opacity-80 mb-2">Home</p></Link>
                    <Link href="/Explore"><p className="text-black hover:underline opacity-80 mb-2">Explore</p></Link>
                    {account !== 'Connect Wallet' && (
                        <>
                            <Link href="/Collection"><p className="text-black hover:underline opacity-80 mb-2">Your Collection</p></Link>
                            <Link href="/Create"><p className="text-black hover:underline opacity-80 mb-2">Create</p></Link>
                        </>
                    )}
                    <button onClick={connectWallet} className="text-black bg-white text-sm font-bold p-[8px] rounded-lg bg-opacity-40">
                        <p>
                            {account === "Connect Wallet"
                                ? 'Connect Wallet'
                                : `${account.slice(0, 5)}...${account.slice(account.length - 3)}`}
                        </p>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Navbar;
