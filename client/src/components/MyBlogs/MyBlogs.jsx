import { Box, Card } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector  , useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { getMyBlogs } from "../../Redux/Action/getMyBlogs";
import ColorTabs from "../ColorTabs/ColorTabs";
import Options from "../Options/Options";


const MyBlogs = () => {
  const result = useSelector((state) => state);
  console.log(result);
  const [blogs, setBlogs] = useState([]);
  const dispatch = useDispatch();
  
  try {
    var walletAddress = result.user.user.user.userWalletAddress;
  } catch (error) {
    console.log(error);
  }

  //  fetching the user blogs using his/her wallet address
    const fetchUserBlogs = async()=>{
      try {
        const data = await dispatch(getMyBlogs({address: walletAddress}));
        console.log(data);
        setBlogs(data.blogs);
      } catch (error) {
        console.log(error)
      }
    }

  useEffect(() => {
    fetchUserBlogs();
  }, [walletAddress , result.getmyBlogs]);

  // console.log(address);
  if (!walletAddress) {
    return (
      <h2 style={{ color: "white" }}>
        Please connect your wallet first to see your blogs
      </h2>
    );
  }

  return (
    <div>
      <Box>
        {/* <ColorTabs/> */}
        <Box sx={{ mt: 2 }}>
          {blogs.map((item) => (
            <>
              <Card sx={{ backgroundColor: "#131129", color: "white", mt: 2 }}>
                <Box sx={{ p: 3 }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Link to={item._id.toString()} id="title">
                      <h1>{item.title}</h1>
                    </Link>
                    <Options
                      id={item._id.toString()}
                      fetchUserBlog={fetchUserBlogs}
                    />
                  </Box>
                  <p>{item.address}</p>
                  <p> {item.createdAt} </p>
                </Box>
              </Card>
            </>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default MyBlogs;
