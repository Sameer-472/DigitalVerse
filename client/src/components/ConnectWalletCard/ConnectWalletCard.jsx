import { Box, Card } from "@mui/material";
import React from "react";
import { ConnectWallet } from "../WalletConnection/ConnectWallet";

const ConnectWalletCard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItem: "center",
        height: "55vh",
        backgroundColor: "#191C1F",
      }}
    >
      <Card
        style={{
          textAlign: "center",
          width: "fit-content",
          backgroundColor: "#191C1F",
          color: "white",
          padding: 35,
        }}
      >
        <h2>Connect</h2>
        <h3>Please connect your Blockchain wallet to see this page</h3>
        <ConnectWallet />
      </Card>
    </Box>
  );
};

export default ConnectWalletCard;
