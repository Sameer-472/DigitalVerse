// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const nftMarketplace = await NFTMarketplace.deploy();

  await nftMarketplace.deployed();

  
  console.log("NFTMarketplace deployed to:", nftMarketplace.address);
  
  const creatNFT = await nftMarketplace.createToken("https://ipfs.infura.io/ipfs/QmPWTo8H2auRWJNdyEahCLYRhgTATZKPXSP9j5HnKNF7Sp" , 1.2, { value: 0.025 });
  // console.log(createNFT)
  const nftItem = await nftMarketplace.fetchMarketItem()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    // console.error(error);
    process.exit(1);
  });
