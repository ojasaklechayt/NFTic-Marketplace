import React from 'react'
import Navbar from '../navbar'

const Data = {
  card1: {
    Image: "https://s3-alpha-sig.figma.com/img/a702/d67c/ee62c2470d384a4abee2a53cdf676572?Expires=1692576000&Signature=nylK-ZGeO~EfrFg7n6f3bPHz0WandpTwM2-8YYyI-T9oqJlKIiD9IKM05uXJjMUTcy8s5s9eWJ5Fjik53rcGf3LwmqdSohe6pR572VSBAZnBmwrWMZEAoQDJ7dsO2E6UUO0m3Reisw~xMaMcGY17Z5IvClmirVQv0Z5mUqahXMNT~sEMc5uJqDLc~x7jOPKIRu44C47tBc5SuVdNEZujg~soF4Cqm9Gb1uFswA71KBsqCdw1KgG2w4b3-vLbe4aCYRGGM76Nrfigav6~sXkT9GG22soZsuAkFMaYRLw6bSyaPu7s1lj-ioWxA5rdWvx-0pcDHDmR~5GcsITlY8PcxA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    Name: "Nyan Cat",
    Price: 0.05,
    Address: "0xA1B...A42"
  },
  card2: {
    Image: "https://s3-alpha-sig.figma.com/img/a702/d67c/ee62c2470d384a4abee2a53cdf676572?Expires=1692576000&Signature=nylK-ZGeO~EfrFg7n6f3bPHz0WandpTwM2-8YYyI-T9oqJlKIiD9IKM05uXJjMUTcy8s5s9eWJ5Fjik53rcGf3LwmqdSohe6pR572VSBAZnBmwrWMZEAoQDJ7dsO2E6UUO0m3Reisw~xMaMcGY17Z5IvClmirVQv0Z5mUqahXMNT~sEMc5uJqDLc~x7jOPKIRu44C47tBc5SuVdNEZujg~soF4Cqm9Gb1uFswA71KBsqCdw1KgG2w4b3-vLbe4aCYRGGM76Nrfigav6~sXkT9GG22soZsuAkFMaYRLw6bSyaPu7s1lj-ioWxA5rdWvx-0pcDHDmR~5GcsITlY8PcxA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    Name: "Nyan Cat",
    Price: 0.05,
    Address: "0xA1B...A42"
  },
  card3: {
    Image: "https://s3-alpha-sig.figma.com/img/a702/d67c/ee62c2470d384a4abee2a53cdf676572?Expires=1692576000&Signature=nylK-ZGeO~EfrFg7n6f3bPHz0WandpTwM2-8YYyI-T9oqJlKIiD9IKM05uXJjMUTcy8s5s9eWJ5Fjik53rcGf3LwmqdSohe6pR572VSBAZnBmwrWMZEAoQDJ7dsO2E6UUO0m3Reisw~xMaMcGY17Z5IvClmirVQv0Z5mUqahXMNT~sEMc5uJqDLc~x7jOPKIRu44C47tBc5SuVdNEZujg~soF4Cqm9Gb1uFswA71KBsqCdw1KgG2w4b3-vLbe4aCYRGGM76Nrfigav6~sXkT9GG22soZsuAkFMaYRLw6bSyaPu7s1lj-ioWxA5rdWvx-0pcDHDmR~5GcsITlY8PcxA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    Name: "Nyan Cat",
    Price: 0.05,
    Address: "0xA1B...A42"
  },
  card4: {
    Image: "https://s3-alpha-sig.figma.com/img/a702/d67c/ee62c2470d384a4abee2a53cdf676572?Expires=1692576000&Signature=nylK-ZGeO~EfrFg7n6f3bPHz0WandpTwM2-8YYyI-T9oqJlKIiD9IKM05uXJjMUTcy8s5s9eWJ5Fjik53rcGf3LwmqdSohe6pR572VSBAZnBmwrWMZEAoQDJ7dsO2E6UUO0m3Reisw~xMaMcGY17Z5IvClmirVQv0Z5mUqahXMNT~sEMc5uJqDLc~x7jOPKIRu44C47tBc5SuVdNEZujg~soF4Cqm9Gb1uFswA71KBsqCdw1KgG2w4b3-vLbe4aCYRGGM76Nrfigav6~sXkT9GG22soZsuAkFMaYRLw6bSyaPu7s1lj-ioWxA5rdWvx-0pcDHDmR~5GcsITlY8PcxA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    Name: "Nyan Cat",
    Price: 0.05,
    Address: "0xA1B...A42"
  },
  card5: {
    Image: "https://s3-alpha-sig.figma.com/img/a702/d67c/ee62c2470d384a4abee2a53cdf676572?Expires=1692576000&Signature=nylK-ZGeO~EfrFg7n6f3bPHz0WandpTwM2-8YYyI-T9oqJlKIiD9IKM05uXJjMUTcy8s5s9eWJ5Fjik53rcGf3LwmqdSohe6pR572VSBAZnBmwrWMZEAoQDJ7dsO2E6UUO0m3Reisw~xMaMcGY17Z5IvClmirVQv0Z5mUqahXMNT~sEMc5uJqDLc~x7jOPKIRu44C47tBc5SuVdNEZujg~soF4Cqm9Gb1uFswA71KBsqCdw1KgG2w4b3-vLbe4aCYRGGM76Nrfigav6~sXkT9GG22soZsuAkFMaYRLw6bSyaPu7s1lj-ioWxA5rdWvx-0pcDHDmR~5GcsITlY8PcxA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    Name: "Nyan Cat",
    Price: 0.05,
    Address: "0xA1B...A42"
  },
  card6: {
    Image: "https://s3-alpha-sig.figma.com/img/a702/d67c/ee62c2470d384a4abee2a53cdf676572?Expires=1692576000&Signature=nylK-ZGeO~EfrFg7n6f3bPHz0WandpTwM2-8YYyI-T9oqJlKIiD9IKM05uXJjMUTcy8s5s9eWJ5Fjik53rcGf3LwmqdSohe6pR572VSBAZnBmwrWMZEAoQDJ7dsO2E6UUO0m3Reisw~xMaMcGY17Z5IvClmirVQv0Z5mUqahXMNT~sEMc5uJqDLc~x7jOPKIRu44C47tBc5SuVdNEZujg~soF4Cqm9Gb1uFswA71KBsqCdw1KgG2w4b3-vLbe4aCYRGGM76Nrfigav6~sXkT9GG22soZsuAkFMaYRLw6bSyaPu7s1lj-ioWxA5rdWvx-0pcDHDmR~5GcsITlY8PcxA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    Name: "Nyan Cat",
    Price: 0.05,
    Address: "0xA1B...A42"
  },
  card7: {
    Image: "https://s3-alpha-sig.figma.com/img/a702/d67c/ee62c2470d384a4abee2a53cdf676572?Expires=1692576000&Signature=nylK-ZGeO~EfrFg7n6f3bPHz0WandpTwM2-8YYyI-T9oqJlKIiD9IKM05uXJjMUTcy8s5s9eWJ5Fjik53rcGf3LwmqdSohe6pR572VSBAZnBmwrWMZEAoQDJ7dsO2E6UUO0m3Reisw~xMaMcGY17Z5IvClmirVQv0Z5mUqahXMNT~sEMc5uJqDLc~x7jOPKIRu44C47tBc5SuVdNEZujg~soF4Cqm9Gb1uFswA71KBsqCdw1KgG2w4b3-vLbe4aCYRGGM76Nrfigav6~sXkT9GG22soZsuAkFMaYRLw6bSyaPu7s1lj-ioWxA5rdWvx-0pcDHDmR~5GcsITlY8PcxA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    Name: "Nyan Cat",
    Price: 0.05,
    Address: "0xA1B...A42"
  },
  card8: {
    Image: "https://s3-alpha-sig.figma.com/img/a702/d67c/ee62c2470d384a4abee2a53cdf676572?Expires=1692576000&Signature=nylK-ZGeO~EfrFg7n6f3bPHz0WandpTwM2-8YYyI-T9oqJlKIiD9IKM05uXJjMUTcy8s5s9eWJ5Fjik53rcGf3LwmqdSohe6pR572VSBAZnBmwrWMZEAoQDJ7dsO2E6UUO0m3Reisw~xMaMcGY17Z5IvClmirVQv0Z5mUqahXMNT~sEMc5uJqDLc~x7jOPKIRu44C47tBc5SuVdNEZujg~soF4Cqm9Gb1uFswA71KBsqCdw1KgG2w4b3-vLbe4aCYRGGM76Nrfigav6~sXkT9GG22soZsuAkFMaYRLw6bSyaPu7s1lj-ioWxA5rdWvx-0pcDHDmR~5GcsITlY8PcxA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    Name: "Nyan Cat",
    Price: 0.05,
    Address: "0xA1B...A42"
  },
}

const chunkData = (data, size) => {
  const chunks = [];
  for (let i = 0; i < data.length; i += size) {
    chunks.push(data.slice(i, i + size));
  }
  return chunks;
};

const Explore = () => {
  const rowData = chunkData(Object.keys(Data).map((key) => Data[key]), 4);

  return (
    <div>
      <Navbar />
      <div>
        <h1 className="text-3xl md:text-6xl text-center mt-20">Explore</h1>
        <div className="flex flex-wrap justify-center mt-10 mb-10">
          {rowData.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-col md:flex-row mb-4 justify-center space-x-6 md:space-x-4">
              {row.map((card, cardIndex) => (
                <div
                  key={cardIndex}
                  className="bg-white text-black text-center flex flex-col space-y-3 md:w-1/2 lg:w-1/4 rounded-lg mx-2 my-2 md:mx-0 md:my-0">
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
                    <p className="py-3 text-2xl">Buy</p>
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

export default Explore;