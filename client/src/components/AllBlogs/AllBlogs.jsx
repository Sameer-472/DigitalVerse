import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "@mui/material";
import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";
import { Box } from "@mui/system";
import { Link, Outlet } from "react-router-dom";
import "./AllBlogs.css";

const useAxios = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

const URL = "http://localhost:8000/all";
// console.log(Date.parse(data[0].createdAt))
// console.log(data)

export const AllBlogs = () => {
  const { data, loading, error } = useAxios(URL);
  // console.log(Date.parse(data[0].createdAt));
  return (
    <div>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained">
            <Link id="" to="/myBlogs" style={{color: "white" , textDecoration: "none"}}>
              Your Blogs
            </Link>
          </Button>
          <Button
            variant="outlined"
            endIcon={<CreateTwoToneIcon sx={{ color: "orangered" }} />}
          >
            <Link id="link" to="/addBlog">
              Post a Blog
            </Link>
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          {data.map((item) => (
            // console.log(item._id);
            <>
              <Card sx={{ backgroundColor: "#131129", color: "white", mt: 2 }}>
                <Box sx={{ p: 3 }}>
                  <Link to={item._id.toString()} id="title">
                    {" "}
                    <h1>
                      {" "}
                      {item._id} {item.title}
                    </h1>{" "}
                  </Link>
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
