import { Box, Card, Button } from "@mui/material";
import axios from "axios";
import React, { useState , useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


export const EditBlog= () => {
  const result = useSelector((state) => state);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [blog, setBlog] = useState([])
  const {id} = useParams()
  const navigate = useNavigate();
  console.log(id);
  // console.log(result.user.user.user.userWalletAddress);
  
//   getting the blog 
  const getBlog = async()=>{
    const url = `http://localhost:8000/all/${id}`
    try {
    const data = await axios.post(url);
    setBlog(data.data)
    setTitle(data.data.title)
    setBody(data.data.blog)
    } catch (error) {
      console.log(error)
    }
  }

  //updating the blog
  const updateBlog = async()=>{
    const url = `http://localhost:8000/editSingleData/${id}`
    try {
    const data = await axios.put(url , {
        "title": title,
        "blog": body
    });
    setBlog(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(blog)

  useEffect(() => {
    getBlog();
  }, [])
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log(title, body);
    updateBlog()
    navigate("/myBlogs")
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
          Update
        </Button>
      </form>
    </Box>
  );
};
