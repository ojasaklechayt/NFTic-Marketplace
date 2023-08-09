'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useWeb3Modal } from '@web3modal/react'
import { Web3Button } from '@web3modal/react'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [walletName, setWalletName] = useState('Connect Wallet'); // Initialize walletName state
    const { open, account } = useWeb3Modal(); // Destructure account from useWeb3Modal

    useEffect(() => {
        if (account) {
            // Update the walletName to the first 5 characters of the wallet address
            setWalletName(account.slice(0, 5));
        } else {
            setWalletName('Connect Wallet'); // Reset walletName when wallet is disconnected
        }
    }, [account]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleConnectWallet = async () => {
        try {
            await open();
            console.log('Wallet connected, address:', account);
        } catch (error) {
            console.error('Error connecting wallet:', error);
        }
    };

    
    return (
        <div>
            <div className="px-5 md:bg-[#D9D9D9] md:bg-opacity-20 h-[50px] flex flex-row items-center relative">
                <div className="hidden md:flex flex-row space-x-10 lg:space-x-20 cursor-pointer">
                    <Link href="/"><p className="hover:underline opacity-80">Home</p></Link>
                    <Link href="/Explore"><p className="hover:underline opacity-80">Explore</p></Link>
                    <Link href="/Collection"><p className="hover:underline opacity-80">Your Collection</p></Link>
                    <Link href="/Create"><p className="hover:underline opacity-80">Create</p></Link>
                </div>
                <div className="hidden ml-auto md:block">
                    <Web3Button icon='hide' />
                </div>
                <div className="ml-auto md:hidden">
                    <button
                        className="bg-white text-white text-sm font-bold p-[8px] rounded-lg bg-opacity-40"
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? 'Close Menu' : 'Menu'}
                    </button>
                </div>
            </div>
            {/* Hamburger Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute right-0 top-14 mr-5 bg-[#D9D9D9] p-4 rounded-lg shadow-lg space-y-2">
                    <Link href="/"><p className="text-black hover:underline opacity-80 mb-2">Home</p></Link>
                    <Link href="/Explore"><p className="text-black hover:underline opacity-80 mb-2">Explore</p></Link>
                    <Link href="/Collection"><p className="text-black hover:underline opacity-80 mb-2">Your Collection</p></Link>
                    <Link href="/Create"><p className="text-black hover:underline opacity-80 mb-2">Create</p></Link>
                    {/* <button onClick={handleConnectWallet} className="text-black bg-white text-sm font-bold p-[8px] rounded-lg bg-opacity-40">{walletName}</button> */}
                    <Web3Button icon='hide'/> 
                </div>
            )}
        </div>
    );
};

export default Navbar;