import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/system";
// import ColorTabs from "../../components/ColorTabs/ColorTabs";
import { AllBlogs } from "../../components/AllBlogs/AllBlogs";



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

const Blogs = () => {
  const { data, loading, error } = useAxios(URL);
  console.log(data);
  return (
    <div>
      <Box>
          {/* <ColorTabs/>     */}
          <AllBlogs/>
      </Box>
    </div>
  );
};

export default Blogs; 
