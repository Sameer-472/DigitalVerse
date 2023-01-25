import React from "react";
import { Card, Typography, Box } from "@mui/material";
import { Button } from "@mui/material";
import "./Home.css";
import styled from "@emotion/styled";
import { NftCard } from "../../components/NftCard/NftCard";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link, useNavigate } from "react-router-dom";
import { spacing } from "@mui/system";
import NFTTable from "../../components/NFTTable";
import { useContext, useState } from "react";
import { Context } from "../../Context/Context";
import NFTMarketplace from "../../contracts/NFTMarketplace.sol/NFTMarketplace.json";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";
import { useEffect } from "react";
import { CardAnimation } from "../../components/CardsAnimation/CardAnimation";


const Discover = styled(Button)`
  background: linear-gradient(
    90deg,
    rgba(255, 231, 7, 1) 19%,
    rgba(226, 80, 181, 1) 90%
  );
  margin-right: 50px;
  :hover {
    background: linear-gradient(
      90deg,
      rgba(255, 231, 7, 1) 19%,
      rgba(226, 80, 181, 1) 90%
    );
  }
  color: black;
  font-weight: bold;
`;
const Create = styled(Button)`
  border: 2px solid rgb(255, 231, 7);
  color: orange;
`;

const Home = () => {
  const { nft, loadNFTs, userPurchasedNFT, fetchAllItems, account, allItems } =
    useContext(Context);

  const [NftCollection, setNftCollection] = useState([]);
  const slice = NftCollection.slice(
    Math.max(NftCollection.length - 4, 1)
  ).reverse();

  const navigate= useNavigate();

  async function BuyNft(value) {
    console.log("hello world");
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0xa8407D2355601d1aBF05C3E4D62710be416964D0",
      NFTMarketplace.abi,
      signer
    );
    console.log(contract);
    const price = ethers.utils.parseUnits(value.price.toString(), "ether");
    console.log(price);
    console.log(typeof price);
    const transection = await contract.createMarketSale(value.id, {
      value: price,
    });
    await transection.wait();
    loadNFTs();
    // loadCollections();
    userPurchasedNFT();
    fetchAllItems();
  }

  async function loadCollections() {
    const collections = await Promise.all(
      nft.map(async (value) => {
        console.log("fetching data....");
        const data = await axios.get(value.Uri);
        const response = data.data;
        console.log("sucssessfully fecthed data.");
        const price = ethers.utils.formatUnits(value.price.toString(), "ether");
        const listedItem = await {
          id: value.tokenId.toNumber(),
          name: response.name,
          description: response.description,
          image: response.image,
          seller: value.seller,
          owner: value.owner,
          sold: value.sold,
          price,
        };
        return listedItem;
      })
    );
    setNftCollection(collections);
    console.log(NftCollection);
  }

  useEffect(() => {
    loadCollections()
  }, [])
  
  return (
    <>
      <Box id="box">
        <Box id="upperBox">
        <Box id="text-container">
          Explore the Future of Digital Art <br />
          with<br />
          BINANCE SMART CHAIN
             <img width="50" src="./assets/bnb.png" />
        </Box>
        <Box>
          <CardAnimation/>
        </Box>
        </Box>

        <Box sx={{display: 'flex', justifyContent: 'center' , alignItems: 'center', mt: 10 , flexDirection: 'column'}}>
          <h1 style={{fontSize: '45px'}}>Create NFTs in a very low Gas Fee</h1>
          <Box sx={{display: 'flex' , justifyContent: 'space-between'}}>
            <Button id="button1" onClick={()=> navigate('/explore')}>Explore</Button>
            <Button id="button2" onClick={()=> navigate('/createNFT')}>Create</Button>
          </Box>
        </Box>


        <Box sx={{ mt: 5, mr: 3, ml: 3 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto auto auto", rowGap: "35px" ,backgroundColor: '#191C1F' 
            }}
          >
            {slice.map((value, index) => (
              <NftCard
                src={value.image}
                name={value.name}
                price={value.price}
                seller={value.seller}
                BuyNft={BuyNft}
                value={value}
              />
            ))}
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Home;
