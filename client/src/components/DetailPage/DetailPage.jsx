import {
  Card,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { ethers } from "ethers";
import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../Context/Context";
import { NftCard } from "../NftCard/NftCard";
import "./DetailPage.css";
import Web3Modal from "web3modal";
import NFTMarketplace from "../../contracts/NFTMarketplace.sol/NFTMarketplace.json";
import Resell from "../ResellModal/Resell";

const DetailPage = () => {
  const { id } = useParams();
  const [loading, setloading] = useState(false);
  const [items, setItems] = useState([]);
  const { nft, loadNFTs, userPurchasedNFT, fetchAllItems, account, allItems } =
    useContext(Context);
  const navigate = useNavigate();

  const myNft = allItems.filter(
    (item) => item.tokenId.toNumber() === parseInt(id)
  );

  useEffect(() => {
    LoadNFT();
  }, [allItems]);

  async function LoadNFT() {
    try {
      const userNFT = await Promise.all(
        myNft.map(async (items, index) => {
          setloading(true);
          const data = await axios.get(items.Uri);
          const response = data.data;
          setloading(false);
          const price = ethers.utils.formatUnits(
            items.price.toString(),
            "ether"
          );
          const listedItem = await {
            id: items.tokenId.toNumber(),
            name: response.name,
            description: response.description,
            image: response.image,
            seller: items.seller,
            owner: items.owner,
            sold: items.sold,
            price,
          };
          return listedItem;
        })
      );
      // console.log(userNFT)
      setItems(userNFT);
    } catch (error) {
      console.log(error);
    }
  }

  async function BuyNft(value) {
    console.log("hello world");
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    // const contract = new ethers.Contract( "0x95dC2D05Bafe0Ef295f5701811D8AB35245efa0C",
    const contract = new ethers.Contract(
      "0x1B9646916e63b6676646872C359a41C62CFe97Af",
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
    userPurchasedNFT();
    fetchAllItems();
    navigate("/mynfts");
  }

  const RenderButton = () => {
    if (account !== items[0].seller && items[0].sold === true) {
      return <Resell value={items} />;
    } else if (account !== items[0].seller) {
      return (
        <>
          <Button variant="contained" id="detailBuyButton" onClick={()=> BuyNft(items[0])}>
            Buy
          </Button>
        </>
      );
    }
  };

  const RenderNFT = () => {
    try {
      return (
        <>
          <Box id="nftDetail">
            <Box>
              <img
                src={items[0].image}
                alt=""
                srcset=""
                width="400"
                height="400"
                style={{ borderRadius: "20px" }}
              />
            </Box>
            <Box
              sx={{
                textAlign: "start",
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}
            >
              <h1
                style={{
                  fontSize: "50px",
                  color: "white",
                  fontFamily: "bolder",
                }}
              >
                {items[0].name}
              </h1>
              {/* <p>Description</p> */}
              {/* <p id="description">{items[0].description}</p> */}
              <ListItem
                sx={{ display: "flex", flexDirection: "column" }}
                alignItems="flex-start"
              >
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        sx={{
                          display: "inline",
                          fontFamily: "bolder",
                          color: "white",
                          fontSize: "30px",
                        }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Name
                      </Typography>
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{
                          display: "inline",
                          fontFamily: "bolder",
                          color: "whitesmoke",
                          fontSize: "20px",
                        }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {items[0].name}
                      </Typography>
                    </React.Fragment>
                  }
                />
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        sx={{
                          display: "inline",
                          fontFamily: "bolder",
                          color: "white",
                          fontSize: "30px",
                        }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Description
                      </Typography>
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{
                          display: "inline",
                          fontFamily: "bolder",
                          color: "whitesmoke",
                          fontSize: "20px",
                        }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {items[0].description}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  color: "white",
                }}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Box
                      id="circle1"
                      sx={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "100%",
                        backgroundColor: "green",
                      }}
                    ></Box>
                    {/* <Avatar aria-hidden sx={{backgroundColor: 'green'}}/> */}
                  </ListItemAvatar>
                  <ListItemText
                    primary="Current Owner"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{
                            display: "inline",
                            fontFamily: "bolder",
                            color: "white",
                          }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {items[0].owner}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Box
                      id="circle2"
                      sx={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "100%",
                        backgroundColor: "green",
                      }}
                    ></Box>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Current Seller"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{
                            display: "inline",
                            fontFamily: "bolder",
                            color: "white",
                          }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {items[0].seller}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <RenderButton/>
              </Box>
              {/* idhar paste karo  */}
            </Box>
          </Box>
        </>
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <RenderNFT />
    </div>
  );
};

export default DetailPage;
