import React , {useState} from "react";
import { Card, Typography, Button, styled, Box } from "@mui/material";
import "./style.css";
import { Context } from "../../Context/Context";
import { useContext } from "react";
import Resell from "../ResellModal/Resell";
import { Link } from "react-router-dom";


export const NftCard = (props) => {
  const { src, name, price, seller, BuyNft, value, sold , id} = props;
  const { account } = useContext(Context);
  const [showButton, setShowButton] = useState(false);

  const RenderButton = () => {
    if (account !== seller && sold === true) {
      return <Resell value={value} />;
    } else if (account !== seller) {
      return (
        <>
        {showButton && (<Button id="buyButton" onClick={() => BuyNft(value)}>Buy</Button>)}
        {/* {showButton && <h1>hello</h1>} */}
        </>
      );
    }
  };

  return (
    <div>
      <Card id="outerCard" onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}>
        <Card id="innerCard">
          <img id="NftArt" src={src} alt="" />
          <Box
            sx={{ display: "flex", color: "rgb(103, 101, 101)", fontWeight: "bolder" , justifyContent: "center" }}
          >
            {name}
          </Box>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "5px",
            }}
          >
            <span>
              <span style={{ color: "yellow", fontWeight: "bolder" }}>
                {price}
              </span>{" "}
              <img width={20} src="/assets/bnb.png" alt="" />{" "}
            </span>
            {RenderButton()}
          </div>
        </Card>
      </Card>
    </div>
  );
};
