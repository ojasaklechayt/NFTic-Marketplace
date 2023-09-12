// Loader.js
import React from 'react';

const Loader = () => {
    return (
        <div class="flex flex-col items-center justify-center mt-20">
            <div class="mb-6">
                <div class="text-center text-2xl mt-2">
                    <p class="animate-blink inline-block">Minting<span class="animate-dots"></span></p>
                </div>
            </div>
            <div class="text-center text-xs md:text-base">
                <p>Why did the Ethereum developer<br/>create a new smart contract?</p>
                <p>Because the old one was starting to get a little "gas-sy"!</p>
            </div>
        </div>
    );
}

export default Loader;
