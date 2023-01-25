import axios from "axios";
import { ethers } from "ethers";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../Context/Context";
import Web3Modal from "web3modal";
import NFTMarketplace from "../../contracts/NFTMarketplace.sol/NFTMarketplace.json";
import { Box } from "@mui/system";
import { NftCard } from "../../components/NftCard/NftCard";
import "./Explore.css";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";

const Explore = () => {
  const { nft, loadNFTs, userPurchasedNFT, fetchAllItems, account } =
    useContext(Context);

  const [NftCollection, setNftCollection] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    loadCollections();
    fetchAllItems();
    // loadNFTs()
  }, [nft]);

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
        setloading(false);
        return listedItem;
      })
    );
    setNftCollection(collections);
    console.log(NftCollection);
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
    loadCollections();
    userPurchasedNFT();
    fetchAllItems();
  }
  return (
    <Box sx={{ height: "fit-screen" }} id="explore">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto",
          rowGap: "35px",
          backgroundColor: "#191C1F",
        }}
      >
        {loading ? (
          <>
          <Box sx={{ pt: 0.5 , ml: 5}}>
            <Skeleton variant="rectangular" width={210} height={218} />
            <Skeleton width="40%" />
            <Skeleton width="40%" />
          </Box>
          <Box sx={{ pt: 0.5 , ml: 5}}>
            <Skeleton variant="rectangular" width={210} height={218} />
            <Skeleton width="40%" />
            <Skeleton width="40%" />
          </Box>
          <Box sx={{ pt: 0.5 , ml: 5}}>
            <Skeleton variant="rectangular" width={210} height={218} />
            <Skeleton width="40%" />
            <Skeleton width="40%" />
          </Box>
          <Box sx={{ pt: 0.5 , ml: 5}}>
            <Skeleton variant="rectangular" width={210} height={218} />
            <Skeleton width="40%" />
            <Skeleton width="40%" />
          </Box>
          <Box sx={{ pt: 0.5 , ml: 5}}>
            <Skeleton variant="rectangular" width={210} height={218} />
            <Skeleton width="40%" />
            <Skeleton width="40%" />
          </Box>
          <Box sx={{ pt: 0.5 , ml: 5}}>
            <Skeleton variant="rectangular" width={210} height={218} />
            <Skeleton width="40%" />
            <Skeleton width="40%" />
          </Box>
          <Box sx={{ pt: 0.5 , ml: 5}}>
            <Skeleton variant="rectangular" width={210} height={218} />
            <Skeleton width="40%" />
            <Skeleton width="40%" />
          </Box>
          <Box sx={{ pt: 0.5 , ml: 5}}>
            <Skeleton variant="rectangular" width={210} height={218} />
            <Skeleton width="40%" />
            <Skeleton width="40%" />
          </Box>
          </>
        ) : (
          NftCollection.map((value) => (
            <>
              <Link
                to={value.id.toString()}
                onClick={() => console.log("nft ki id", value.id)}
                style={{ textDecoration: "none" }}
              >
                <NftCard
                  src={value.image}
                  name={value.name}
                  price={value.price}
                  owner={value.owner}
                  seller={value.seller}
                  BuyNft={BuyNft}
                  value={value}
                  id={value.id}
                />
              </Link>
            </>
          ))
        )}
      </Box>
    </Box>
  );
};

export default Explore;
