import { Card } from "@mui/material";
import React from "react";
import "./create.css";
import { TextField, Box, Button } from "@mui/material";
import ImageTwoToneIcon from "@mui/icons-material/ImageTwoTone";
import styled from "@emotion/styled";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useContext } from "react";
import { Context } from "../../Context/Context";
import { useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner/Spinner";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import NFTMarketplace from "../../contracts/NFTMarketplace.sol/NFTMarketplace.json";
import { createItem } from "../../Redux/Action/createItem";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Snackbar/Snackbar";
import { useNavigate } from "react-router-dom";
import ConnectWalletCard from "../../components/ConnectWalletCard/ConnectWalletCard";
import BasicModal from "../../components/BasicModal";

const MyCard = styled(Card)`
  border-color: 50px solid orange;
`;

const projectId = "2DOJC0wv4QSFUWiDOw8ChpQBySv";
const projectSecretKey = "7335853015c063ff24bc539f8600baa0";
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

export const CreateNFT = () => {
  const result = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formInput, setformInput] = useState({
    price: "",
    name: "",
    description: "",
  });

  let ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization,
    },
  });

  const [fileUrl, setfileUrl] = useState(null);
  const [loading, setloading] = useState(false);
  const [transection, setTransection] = useState(null);
  const { loadNFTs, allItems } = useContext(Context);
  const [duplicateImg, setduplicateImg] = useState(false);

  async function checkUniqueImage(cid) {
    const uniqueImage = await Promise.all(
      allItems.map(async (value) => {
        console.log(value.Uri);
        const data = await axios.get(value.Uri);
        const response = data.data;
        console.log("sucssessfully fecthed data.", response);
        const uniquePath = await response.image;
        console.log("unique images links", uniquePath);
        const check = uniquePath.includes(cid);
        console.log(" checking the image.........", check);
        return uniquePath.includes(cid);
      })
    );
    return uniqueImage;
  }

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      setloading(true);
      const added = await ipfs.add(file);
      const url = `https://digitalverse.infura-ipfs.io/ipfs/${added.path}`;
      console.log(added.path);
      console.log("file has been uploaded to:", url);
      setloading(false);
      const index = await checkUniqueImage(url);
      const checkImage = index.includes(true);
      console.log(checkImage);
      console.log("if it is true its not a unique Image", index.includes(true));
      if (checkImage) {
        setduplicateImg(true);
      } else {
        setfileUrl(url);
        setloading(false);
        console.log(fileUrl);
        setduplicateImg(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function uploadFileToIPFS() {
    // console.log("hello");
    const { name, description, price } = formInput;
    console.log(name, description, price);
    if (!name || !description || !price) return;
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });

    console.log(data);
    try {
      const added = await ipfs.add(data);
      console.log("uploading file to ipfs.....");
      const url = `https://digitalverse.infura-ipfs.io/ipfs/${added.path}`;
      return url;
    } catch (error) {
      console.log("Error while uploading file: ", error);
    }
  }

  const createNFT = async (e) => {
    e.preventDefault();
    setloading(true);
    const url = await uploadFileToIPFS();
    console.log("nft metadata url:", url);

    const web3modal = new Web3Modal(); ///this is the point where we are connecting our wallet
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner(); // wallet has been connected
    const contract = new ethers.Contract(
      "0x1B9646916e63b6676646872C359a41C62CFe97Af",
      NFTMarketplace.abi,
      signer
    );
    const parsePrice = ethers.utils.parseUnits(formInput.price, "ether");
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();
    console.log(listingPrice);
    // let transection = await contract.createToken(url, parsePrice , {
    //   value: listingPrice,
    // } );

    try {
      let transection = await contract.createToken(url, parsePrice, {
        value: listingPrice,
      });
      console.log(transection);
      await transection.wait();
      setloading(false);
      setTransection(true);
      const { name, description, price } = formInput;
      dispatch(
        createItem({
          userWalletAddress: result.user.user.user.userWalletAddress,
          name: name,
          description: description,
          Price: price,
          URI: url,
        })
      );
      navigate("/explore");
      console.log(name, description, price);
      loadNFTs();
    } catch (error) {
      setTransection(false);
      console.log(error)
    }
  };

  const RenderButton = () => {
    if (loading) {
      return (
        <Button variant="contained" sx={{ width: "150px", mt: 3 }}>
          <Spinner />
          Checking
        </Button>
      );
    } else if (duplicateImg) {
      return (
        <>
          {/* <Button
            variant="contained"
            sx={{ width: "150px", mt: 3 }}
            // disabled
          >
            Create Item
          </Button> */}

          <BasicModal />
        </>
      );
    } else {
      return (
        <Button
          variant="contained"
          sx={{ width: "150px", mt: 3 }}
          type="submit"
        >
          Create Item
        </Button>
      );
    }
  };

  if (!result.user.walletConnect) {
    return (
      <>
        <ConnectWalletCard />
      </>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        // textAlign: "start",
        justifyContent: "center",
        backgroundColor: "#191C1F",
        color: "white",
      }}
    >
      <h1 style={{ textAlign: "start", color: "white" }}>Create a new Item</h1>
      <form action="" onSubmit={createNFT}>
        <Box>
          <Box
            id="createBox"
            sx={{
              display: "flex",
              // alignItems: "center",
              flexDirection: "column",
              // textAlign: "start",
              justifyContent: "flex-start",
            }}
          >
            <label>Select any image</label>

            {!fileUrl ? (
              <MyCard
                id="card"
                component="label"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ImageTwoToneIcon sx={{ fontSize: "200px" }} />
                <input
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={onChange}
                />
              </MyCard>
            ) : (
              <>
                <Card
                  id="outerCard"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Card id="innerCard">
                    <img
                      style={{
                        width: "300px",
                        height: "300px",
                        borderRadius: "10px",
                      }}
                      src={fileUrl}
                      alt=""
                    />
                  </Card>
                </Card>
                <Button
                  sx={{ width: "fit-content", mt: 2, backgroundColor: "green" }}
                  variant="contained"
                  component="label"
                  onChange={onChange}
                  required
                >
                  <input hidden accept="image/*" multiple type="file" />
                  Change Image
                </Button>
              </>
            )}
            <p id="label">Name</p>
            <pre id="label">The name of the item's</pre>
            <input
              type="text"
              placeholder="name of nft"
              id="inputField"
              required
              onChange={(e) =>
                setformInput({ ...formInput, name: e.target.value })
              }
            />
            <p id="label">Discription</p>
            <pre id="label">
              The description will be included on the item's detail page
              underneath its image.
            </pre>
            <input
              type="text"
              placeholder="provide a details description of your item."
              id="inputField"
              required
              onChange={(e) =>
                setformInput({ ...formInput, description: e.target.value })
              }
            />
            <p id="label">Price</p>
            <pre id="label">Provide the price of the item in ethereum.</pre>
            <input
              type="Number"
              placeholder="Price in ETH"
              id="inputField"
              onChange={(e) =>
                setformInput({ ...formInput, price: e.target.value })
              }
              required
              step="any"
            />
            {/* <Button variant="contained" sx={{width: "150px" , mt: 3}} type="submit">Create Item</Button> */}
            <RenderButton />
            {true && <Message/> }
          </Box>
        </Box>
      </form>
    </Box>
  );
};
