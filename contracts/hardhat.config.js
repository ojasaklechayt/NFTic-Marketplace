require("@nomiclabs/hardhat-waffle");
require("dotenv/config");

const SEPOLIA_URL = process.env.SEP_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports = {
  solidity: "0.8.19",
  plugins: ["@nomicfoundation/hardhat-toolbox"],
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};
