import { Box, Card, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";


export const AddBlog = () => {
  const result = useSelector((state) => state);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const url = 'http://localhost:8000/postBlog'
  // console.log(result.user.user.user.userWalletAddress);

  const postRequest = async(payload)=>{
    try {
    const data = await axios.post(url , payload);
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    // Send the data to the server or save it in a database here
    console.log(title, body);
    await postRequest({
      "title": title,
      "blog": body,
      "address": result.user.user.user.userWalletAddress
    })
  };

  if(!result.user.walletConnect){
    return(
        <>
            <h1 style={{color: "white"}}>Please connect your wallet to first</h1>
        </>
    )
}
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <form onSubmit={handleSubmit}>
        <Card
          sx={{ backgroundColor: "#131129", color: "white", width: "800px" }}
        >
          <textarea
            // type="text"
            placeholder="New Post title here"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            style={{
              backgroundColor: "#131129",
              color: "white",
              fontSize: "40px",
              fontWeight: "bolder",
              resize: "none",
              outline: "none",
              width: "100%",
              border: "none",
            }}
          />
        </Card>
        <br />
        <Card
          sx={{
            backgroundColor: "#131129",
            color: "white",
            height: "400px",
            width: "800px",
          }}
        >
          <textarea
            value={body}
            placeholder="write your post content here..."
            onChange={(event) => setBody(event.target.value)}
            style={{
              backgroundColor: "#131129",
              color: "white",
              fontSize: "20px",
              fontWeight: "bolder",
              resize: "none",
              outline: "none",
              border: "none",
              width: "100%",
              //   height: "500%"
            }}
          />
        </Card>
        <br />
        <Button variant="contained" type="submit">
          Post
        </Button>
      </form>
    </Box>
  );
};
