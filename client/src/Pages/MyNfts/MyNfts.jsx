import { Box, Button, Card } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { NftCard } from "../../components/NftCard/NftCard";
import { useSelector, useDispatch } from "react-redux";
import { getMyNfts } from "../../Redux/Action/getMyNfts";
import { ethers } from "ethers";
import axios from "axios";
import { Context } from "../../Context/Context";
import { useNavigate , Link} from "react-router-dom";
import ConnectWalletCard from "../../components/ConnectWalletCard/ConnectWalletCard";

const MyNfts = () => {
  const result = useSelector((state) => state);

  const [myCollection, setmyCollection] = useState(() => null);
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  const [purchasedItem, setpurchasedItem] = useState([]);
  const [loading, setloading] = useState(false);

  const dispatch = useDispatch();

  console.log(result);
  console.log(myCollection);

  const { nft, allItems, account } = useContext(Context);
  console.log("this is nft", nft);
  console.log("this is all items", allItems);

  const test = [...items, ...purchasedItem];
  console.log("this is items", items);
  console.log("this is account", account);
  console.log("this is test", test);

  async function LoadNFT() {
    if (account) {
      const myNft = nft.filter((item) => item.seller === account);
      console.log(myNft);
      const userNFT = await Promise.all(
        myNft.map(async (value, index) => {
          setloading(true);
          const data = await axios.get(value.Uri);
          const response = data.data;
          setloading(false);
          const price = ethers.utils.formatUnits(
            value.price.toString(),
            "ether"
          );
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
      console.log(userNFT);
      setItems(userNFT);
    }
  }

  async function LoadPurchasedNFT() {
    if (account) {
      const myNft = allItems.filter(
        (item) => item.sold === true && item.owner === account
      );
      console.log(myNft);
      const userPurchasedNFT = await Promise.all(
        myNft.map(async (value, index) => {
          setloading(true);
          const data = await axios.get(value.Uri);
          const response = data.data;
          setloading(false);
          const price = ethers.utils.formatUnits(
            value.price.toString(),
            "ether"
          );
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
      setpurchasedItem(userPurchasedNFT);
    }
  }

  useEffect(() => {
    LoadNFT();
    LoadPurchasedNFT();
  }, [account]);

  if (!result.user.walletConnect) {
    return (
      <>
      <ConnectWalletCard/>
      </>
    );
  }
  console.log(items);
  return (
    <Box sx={{ height: "fit-screen" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto",
          rowGap: "35px",
          backgroundColor: "#191C1F",
        }}
      >
        {test.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              sx={{
                textAlign: "center",
                width: "fit-content",
                backgroundColor: "#191C1F",
                color: "white",
                padding: 10,
                marginBottom: 30,
                marginLeft: 35,
              }}
            >
              <p>
                Sorry You don't have NFTs but you can purchase or create your
                one
              </p>
              <Button onClick={() => navigate("/createNFT")} id="buyButton">
                Create
              </Button>
            </Card>
          </Box>
        ) : (
          test.map((value) => (
            <>
              <Box sx={{marginBottom: 15, marginLeft: 5}}>
            {/* <Link to={value.id.toString()} onClick={()=> console.log("nft ki id",value.id)}style={{textDecoration: 'none'}}> */}
                <NftCard
                  src={value.image}
                  name={value.name}
                  price={value.price}
                  seller={value.seller}
                  sold={value.sold}
                  value={value}
                />
             {/* </Link> */}
              </Box>
            </>
          ))
        )}
      </Box>
    </Box>
  );
};

export default MyNfts;
