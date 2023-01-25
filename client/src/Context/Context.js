import { ethers } from "ethers";
import { createContext, useState, useEffect } from "react";
import NFTMarketplace from "../contracts/NFTMarketplace.sol/NFTMarketplace.json";

export const Context = createContext();



export const ContextProvider = ({ children }) => {
  const [nft, setNft] = useState([]);
  const [purchasedNft, setpurchasedNft] = useState([]);
  const [tokenId, setTokenId] = useState(0);
  const [allItems, setallItems] = useState([]);
  const [account, setAccount] = useState(false);

  const getContract = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/');
      // const provider = new ethers.providers.JsonRpcProvider();
    
      const signer = provider.getSigner('0x1B9646916e63b6676646872C359a41C62CFe97Af');
      // const signer = provider.getSigner();
      const contract = new ethers.Contract(
        "0x1B9646916e63b6676646872C359a41C62CFe97Af",
        NFTMarketplace.abi,
        signer
      );
      return contract;
    } catch (error) {
      console.log(error);
    }
  };

  //this function will fetch all unsold items.
  async function loadNFTs() {
    const items = await getContract();
    const nfts = await items.fetchMarketItems(); // true
    setNft(nfts);
  }

  async function getTransection(){
    try {
      const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/');
      const contract = new ethers.Contract(
        "0x1B9646916e63b6676646872C359a41C62CFe97Af",
        NFTMarketplace.abi,
        provider
      );
      // console.log(contract.createMarketItem())
      // contract.createMarketItem
    // });
    } catch (error) {
      console.log(error)
    }
  }

  //this function will show items that user has purchased.
  async function userPurchasedNFT() {
    const items = await getContract();
    const userPurchasedNFT = await items.fetchUserPurchasedItem();
    // console.log(userPurchasedNFT);
    setpurchasedNft(userPurchasedNFT);
    // console.log(fetchAllItems); // true
    return userPurchasedNFT;
  }

  //this function will fetch all listed item

  async function fetchAllItems() {
    const items = await getContract();
    const fetchAllItems = await items.fetchAllItems();
    setallItems(fetchAllItems);
    console.log("fetching all items" , fetchAllItems);
    return fetchAllItems;
  }

  async function createItem(url, price, value) {
    const contract = await getContract();
    const transection = await contract.createToken(url, price, value);
    await transection.wait();
    return transection;
  }

  async function getListingPrice() {
    const contract = await getContract();
    const listingPrice = await contract.getListingPrice();
    return listingPrice;
  }

  async function getAccountAddress(){
    const accountAddress = localStorage.getItem("address");
    console.log(accountAddress)
    setAccount(accountAddress)
    console.log("calling the getAccountAddress from context",account)
  }

  useEffect(() => {
    getListingPrice();
    loadNFTs();
    userPurchasedNFT();
    fetchAllItems();
    getAccountAddress();
    // getTransection();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          loadNFTs,
          userPurchasedNFT,
          fetchAllItems,
          getListingPrice,
          createItem,
          nft,
          tokenId,
          purchasedNft,
          allItems,
          account,
          getAccountAddress,
          allItems 
        }}
      >
        {children}
      </Context.Provider>
    </>
  );
};
