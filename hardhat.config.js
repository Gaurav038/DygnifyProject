/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config({ path: './.env.local' });

const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY
const GOERLI_RPC_URL = process.env.NEXT_PUBLIC_GOERLI_RPC_URL

module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "goerli",
  // defaultNetwork: "hardhat",

  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      // accounts: [Hardhat],
      chainId: 31337,
    }
    ,
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5
    }
  }
};
