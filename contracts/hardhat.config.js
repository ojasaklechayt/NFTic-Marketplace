require("@nomicfoundation/hardhat-toolbox");
require("hardhat/config").HardhatUserConfig;
require("dotenv/config");
const SEPOLAI_URL = process.env.SEP_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolai: {
      url: SEPOLAI_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};