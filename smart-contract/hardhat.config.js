require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;
// const {mnemonic , BSCSCANAPIKEY} = require('./env.json');
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.4",
  networks: {
    // goerli: {
    //   url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    //   accounts: [GOERLI_PRIVATE_KEY]
    // }
    // bscTestnet:{
    //    url: "https://data-seed-prebsc-1-s1.binance.org:8545",
    //    chainId: 97,
    //    gasPrice: 20000000000,
    //    accounts: {mnemonic}
    // }
  }
};
