'use client'
import { React, useState } from 'react'
import Navbar from '../navbar'

const Data = {
    card1: {
        Image: "https://s3-alpha-sig.figma.com/img/a702/d67c/ee62c2470d384a4abee2a53cdf676572?Expires=1692576000&Signature=nylK-ZGeO~EfrFg7n6f3bPHz0WandpTwM2-8YYyI-T9oqJlKIiD9IKM05uXJjMUTcy8s5s9eWJ5Fjik53rcGf3LwmqdSohe6pR572VSBAZnBmwrWMZEAoQDJ7dsO2E6UUO0m3Reisw~xMaMcGY17Z5IvClmirVQv0Z5mUqahXMNT~sEMc5uJqDLc~x7jOPKIRu44C47tBc5SuVdNEZujg~soF4Cqm9Gb1uFswA71KBsqCdw1KgG2w4b3-vLbe4aCYRGGM76Nrfigav6~sXkT9GG22soZsuAkFMaYRLw6bSyaPu7s1lj-ioWxA5rdWvx-0pcDHDmR~5GcsITlY8PcxA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
        Name: "Nyan Cat",
        Price: 0.05,
        Address: "0xA1B...A42",
        Type: "Unlist"
    },
    card2: {
        Image: "https://s3-alpha-sig.figma.com/img/a702/d67c/ee62c2470d384a4abee2a53cdf676572?Expires=1692576000&Signature=nylK-ZGeO~EfrFg7n6f3bPHz0WandpTwM2-8YYyI-T9oqJlKIiD9IKM05uXJjMUTcy8s5s9eWJ5Fjik53rcGf3LwmqdSohe6pR572VSBAZnBmwrWMZEAoQDJ7dsO2E6UUO0m3Reisw~xMaMcGY17Z5IvClmirVQv0Z5mUqahXMNT~sEMc5uJqDLc~x7jOPKIRu44C47tBc5SuVdNEZujg~soF4Cqm9Gb1uFswA71KBsqCdw1KgG2w4b3-vLbe4aCYRGGM76Nrfigav6~sXkT9GG22soZsuAkFMaYRLw6bSyaPu7s1lj-ioWxA5rdWvx-0pcDHDmR~5GcsITlY8PcxA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
        Name: "Nyan Cat",
        Price: 0.05,
        Address: "0xA1B...A42",
        Type: "List"
    },
    card3: {
        Image: "https://s3-alpha-sig.figma.com/img/a702/d67c/ee62c2470d384a4abee2a53cdf676572?Expires=1692576000&Signature=nylK-ZGeO~EfrFg7n6f3bPHz0WandpTwM2-8YYyI-T9oqJlKIiD9IKM05uXJjMUTcy8s5s9eWJ5Fjik53rcGf3LwmqdSohe6pR572VSBAZnBmwrWMZEAoQDJ7dsO2E6UUO0m3Reisw~xMaMcGY17Z5IvClmirVQv0Z5mUqahXMNT~sEMc5uJqDLc~x7jOPKIRu44C47tBc5SuVdNEZujg~soF4Cqm9Gb1uFswA71KBsqCdw1KgG2w4b3-vLbe4aCYRGGM76Nrfigav6~sXkT9GG22soZsuAkFMaYRLw6bSyaPu7s1lj-ioWxA5rdWvx-0pcDHDmR~5GcsITlY8PcxA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
        Name: "Nyan Cat",
        Price: 0.05,
        Address: "0xA1B...A42",
        Type: "List"
    },
    card4: {
        Image: "https://s3-alpha-sig.figma.com/img/a702/d67c/ee62c2470d384a4abee2a53cdf676572?Expires=1692576000&Signature=nylK-ZGeO~EfrFg7n6f3bPHz0WandpTwM2-8YYyI-T9oqJlKIiD9IKM05uXJjMUTcy8s5s9eWJ5Fjik53rcGf3LwmqdSohe6pR572VSBAZnBmwrWMZEAoQDJ7dsO2E6UUO0m3Reisw~xMaMcGY17Z5IvClmirVQv0Z5mUqahXMNT~sEMc5uJqDLc~x7jOPKIRu44C47tBc5SuVdNEZujg~soF4Cqm9Gb1uFswA71KBsqCdw1KgG2w4b3-vLbe4aCYRGGM76Nrfigav6~sXkT9GG22soZsuAkFMaYRLw6bSyaPu7s1lj-ioWxA5rdWvx-0pcDHDmR~5GcsITlY8PcxA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
        Name: "Nyan Cat",
        Price: 0.05,
        Address: "0xA1B...A42",
        Type: "Unlist"
    },
    card5: {
        Image: "https://s3-alpha-sig.figma.com/img/a702/d67c/ee62c2470d384a4abee2a53cdf676572?Expires=1692576000&Signature=nylK-ZGeO~EfrFg7n6f3bPHz0WandpTwM2-8YYyI-T9oqJlKIiD9IKM05uXJjMUTcy8s5s9eWJ5Fjik53rcGf3LwmqdSohe6pR572VSBAZnBmwrWMZEAoQDJ7dsO2E6UUO0m3Reisw~xMaMcGY17Z5IvClmirVQv0Z5mUqahXMNT~sEMc5uJqDLc~x7jOPKIRu44C47tBc5SuVdNEZujg~soF4Cqm9Gb1uFswA71KBsqCdw1KgG2w4b3-vLbe4aCYRGGM76Nrfigav6~sXkT9GG22soZsuAkFMaYRLw6bSyaPu7s1lj-ioWxA5rdWvx-0pcDHDmR~5GcsITlY8PcxA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
        Name: "Nyan Cat",
        Price: 0.05,
        Address: "0xA1B...A42",
        Type: "List"
    },
    card6: {
        Image: "https://s3-alpha-sig.figma.com/img/a702/d67c/ee62c2470d384a4abee2a53cdf676572?Expires=1692576000&Signature=nylK-ZGeO~EfrFg7n6f3bPHz0WandpTwM2-8YYyI-T9oqJlKIiD9IKM05uXJjMUTcy8s5s9eWJ5Fjik53rcGf3LwmqdSohe6pR572VSBAZnBmwrWMZEAoQDJ7dsO2E6UUO0m3Reisw~xMaMcGY17Z5IvClmirVQv0Z5mUqahXMNT~sEMc5uJqDLc~x7jOPKIRu44C47tBc5SuVdNEZujg~soF4Cqm9Gb1uFswA71KBsqCdw1KgG2w4b3-vLbe4aCYRGGM76Nrfigav6~sXkT9GG22soZsuAkFMaYRLw6bSyaPu7s1lj-ioWxA5rdWvx-0pcDHDmR~5GcsITlY8PcxA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
        Name: "Nyan Cat",
        Price: 0.05,
        Address: "0xA1B...A42",
        Type: "List"
    },
    card7: {
        Image: "https://s3-alpha-sig.figma.com/img/a702/d67c/ee62c2470d384a4abee2a53cdf676572?Expires=1692576000&Signature=nylK-ZGeO~EfrFg7n6f3bPHz0WandpTwM2-8YYyI-T9oqJlKIiD9IKM05uXJjMUTcy8s5s9eWJ5Fjik53rcGf3LwmqdSohe6pR572VSBAZnBmwrWMZEAoQDJ7dsO2E6UUO0m3Reisw~xMaMcGY17Z5IvClmirVQv0Z5mUqahXMNT~sEMc5uJqDLc~x7jOPKIRu44C47tBc5SuVdNEZujg~soF4Cqm9Gb1uFswA71KBsqCdw1KgG2w4b3-vLbe4aCYRGGM76Nrfigav6~sXkT9GG22soZsuAkFMaYRLw6bSyaPu7s1lj-ioWxA5rdWvx-0pcDHDmR~5GcsITlY8PcxA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
        Name: "Nyan Cat",
        Price: 0.05,
        Address: "0xA1B...A42",
        Type: "Unlist"
    },
    card8: {
        Image: "https://s3-alpha-sig.figma.com/img/a702/d67c/ee62c2470d384a4abee2a53cdf676572?Expires=1692576000&Signature=nylK-ZGeO~EfrFg7n6f3bPHz0WandpTwM2-8YYyI-T9oqJlKIiD9IKM05uXJjMUTcy8s5s9eWJ5Fjik53rcGf3LwmqdSohe6pR572VSBAZnBmwrWMZEAoQDJ7dsO2E6UUO0m3Reisw~xMaMcGY17Z5IvClmirVQv0Z5mUqahXMNT~sEMc5uJqDLc~x7jOPKIRu44C47tBc5SuVdNEZujg~soF4Cqm9Gb1uFswA71KBsqCdw1KgG2w4b3-vLbe4aCYRGGM76Nrfigav6~sXkT9GG22soZsuAkFMaYRLw6bSyaPu7s1lj-ioWxA5rdWvx-0pcDHDmR~5GcsITlY8PcxA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
        Name: "Nyan Cat",
        Price: 0.05,
        Address: "0xA1B...A42",
        Type: "List"
    },

}



const chunkData = (data, size) => {
    const chunks = [];
    for (let i = 0; i < data.length; i += size) {
        chunks.push(data.slice(i, i + size));
    }
    return chunks;
};

const Collection = () => {
    const [showListed, setShowListed] = useState(false);

    const filterData = showListed
        ? Object.keys(Data)
            .filter((key) => Data[key].Type === 'List')
            .map((key) => Data[key])
        : Object.keys(Data).map((key) => Data[key]);

    const rowData = chunkData(filterData, 4);

    return (
        <div>
            <Navbar />
            <div>
                <h1 className="text-3xl md:text-6xl text-center mt-20">Your Collection</h1>
                <div className="flex flex-row justify-center mt-5 space-x-5">
                    <button
                        className={`w-40 lg:w-auto bg-gray-400 p-2 px-6 lg:px-10 rounded-full lg:rounded-[25px] hover:bg-gray-500 ${!showListed ? 'bg-gray-500' : ''
                            }`}
                        onClick={() => setShowListed(false)}
                    >
                        <p className="text-center lg:text-left">All NFTs</p>
                    </button>
                    <button
                        className={`w-40 lg:w-auto bg-gray-400 p-2 px-6 lg:px-10 rounded-full lg:rounded-[25px] hover:bg-gray-500 ${showListed ? 'bg-gray-500' : ''
                            }`}
                        onClick={() => setShowListed(true)}
                    >
                        <p className="text-center lg:text-left">Listed NFTs</p>
                    </button>
                </div>

                <div className="flex flex-col justify-center mt-10 mb-10">
                    {rowData.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex flex-col md:flex-row justify-center items-center space-x-6 md:space-x-4 mb-5">
                            {row.map((card, cardIndex) => (
                                <div
                                    key={cardIndex}
                                    className={`bg-white text-black text-center flex flex-col w-60 md:w-0 space-y-3 ${cardIndex === 0 ? 'ml-8 md:ml-0 lg:w-1/4' : 'lg:w-1/6'
                                        } rounded-lg mx-2 my-2 md:mx-0 md:my-0`}
                                    style={{ flex: '0 0 20%', minWidth: '50px' }}
                                >
                                    <img
                                        className="h-40 md:h-[25vh] w-full rounded-tl-lg rounded-tr-lg"
                                        src={card.Image}
                                        alt="Image"
                                    />
                                    <h2 className="font-bold text-xl md:text-2xl">{card.Name}</h2>
                                    <div className="flex flex-row justify-center space-x-4">
                                        <p>{card.Price} ETH</p>
                                        <p>{card.Address}</p>
                                    </div>
                                    <div className="bg-gray-400 flex flex-row justify-center items-center rounded-bl-lg rounded-br-lg cursor-pointer hover:bg-gray-600 hover:text-white">
                                        <p className="py-3 text-2xl">{card.Type}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Collection;