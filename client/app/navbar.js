'use client'
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import { BlockchainConfig } from './Context/AppConfig';

const Navbar = () => {
    const router = useRouter();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [account, setAccount] = useState('Connect Wallet');
    const [ethereum, setEthereum] = useState(null);
    const [provider, setProvider] = useState(null);
    const { connectWallet, currentAccount } = useContext(BlockchainConfig);

    useEffect(() => {
        connectWallet();
        if(!currentAccount){
            window.location.reload();
        }
    },[]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <div className="px-5 md:bg-[#D9D9D9] md:bg-opacity-20 h-[50px] flex flex-row items-center relative">
                <div className="hidden md:flex flex-row space-x-10 lg:space-x-20 cursor-pointer">
                    <Link href="/"><p className="hover:underline opacity-80">Home</p></Link>
                    <Link href="/Explore"><p className="hover:underline opacity-80">Explore</p></Link>
                    {currentAccount !== 'Connect Wallet' && (
                        <>
                            <Link href="/Collection"><p className="hover:underline opacity-80">Your Collection</p></Link>
                            <Link href="/Create"><p className="hover:underline opacity-80">Create</p></Link>
                        </>
                    )}
                </div>
                <div className="hidden ml-auto md:block">
                    <button  onClick={connectWallet} className="text-black bg-white text-sm font-bold p-[8px] rounded-lg bg-opacity-40">
                        <p>
                            {currentAccount === "Connect Wallet"
                                ? 'Connect Wallet'
                                : `${currentAccount.slice(0, 5)}...${currentAccount.slice(currentAccount.length - 5)}`}
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
                    <Link href="/"><p className="text-black hover:underline opacity-80 mb-2 pointer">Home</p></Link>
                    <Link href="/Explore"><p className="text-black hover:underline opacity-80 mb-2 pointer">Explore</p></Link>
                    {currentAccount !== 'Connect Wallet' && (
                        <>
                            <Link href="/Collection"><p className="text-black hover:underline opacity-80 mb-2 pointer">Your Collection</p></Link>
                            <Link href="/Create"><p className="text-black hover:underline opacity-80 mb-2 pointer">Create</p></Link>
                        </>
                    )}
                    <button onClick={connectWallet} className="text-black bg-white text-sm font-bold p-[8px] rounded-lg bg-opacity-40">
                        <p>
                            {currentAccount === "Connect Wallet"
                                ? 'Connect Wallet'
                                : `${currentAccount.slice(0, 5)}...${currentAccount.slice(currentAccount.length - 5)}`}
                        </p>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Navbar;
