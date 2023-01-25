import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { makeStyles, styled } from "@mui/material";
import { ethers } from "ethers";
import { Context } from "../../Context/Context";
import { useState, useContext, useEffect } from "react";
import Web3Modal from "web3modal";
import NFTMarketplace from "../../contracts/NFTMarketplace.sol/NFTMarketplace.json";


const ResellButton = styled(Button)`
  background-color: white;
  color: black;
  font-weight: bolder;
  width: max-content;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function Resell(props) {
  const { value } = props;
  const [open, setOpen] = React.useState(false);
  const { nft, loadNFTs, userPurchasedNFT, fetchAllItems, account } =
    useContext(Context);
  const [input, setinput] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function ResellToken(value) {
    console.log("hello world");
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    // const contract = new ethers.Contract("0x95dC2D05Bafe0Ef295f5701811D8AB35245efa0C" , NFTMarketplace.abi , signer);
    const contract = new ethers.Contract(
      "0x1B9646916e63b6676646872C359a41C62CFe97Af",
      NFTMarketplace.abi,
      signer
    );
    const listingPrice = await contract.getListingPrice();
    console.log(listingPrice);
    console.log(contract);
    // console.log(value.id)
    const price = ethers.utils.parseUnits(input, "ether");
    console.log(price);
    // console.log(typeof(price));
    const transection = await contract.resellToken(value.id, price, {
      value: listingPrice,
    });
    await transection.wait();
    handleClose();
    loadNFTs();
    fetchAllItems();
    userPurchasedNFT();
  }
  useEffect(() => {
    loadNFTs();
    userPurchasedNFT();
  }, [nft, account]);

  return (
    <div>

      <ResellButton onClick={handleClickOpen}>Resell</ResellButton> 
     <Dialog 
        open={open}
        TransitionComponent={Transition}
        keepMounted
        PaperProps={{sx: {backgroundColor: '#535557' , color: 'white'}}}
        aria-describedby="alert-dialog-slide-description"
        // sx={{backgroundColor: 'yellow'}}
      >
        <DialogTitle>{"Write the resell amount of your item?"}</DialogTitle>
        <DialogContent>
        <TextField
        id="outlined-basic"
        label="Resell Price"
        variant="filled"
        onChange={(e) => setinput(e.target.value)}
        sx={{color: 'white',backgroundColor :'#535557'}}
      />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error' variant="contained">Cancel</Button>
          <ResellButton onClick={()=>ResellToken(value)}>Resell</ResellButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
