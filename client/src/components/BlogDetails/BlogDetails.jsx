import { Box , Card} from "@mui/material";
import axios from "axios";
import React , {useState , useEffect}from "react";
import { useParams } from "react-router-dom";


const BlogDetails = () => {
    const {id} = useParams();
    const [blog, setBlog] = useState({})
    const getSingleBlog = async()=>{
    try {
        const blog = await axios.post(`http://localhost:8000/all/${id}`)
        console.log(blog.data)
        setBlog(blog.data)
    } catch (error) {
        console.log(error)
    }
    }
    useEffect(() => {
      getSingleBlog();
    }, [])
    
  return (
    <div>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" , flexDirection: "column"}}
      >
       
          <Card
            sx={{ backgroundColor: "#131129", color: "white", width: "800px" }}
          >
            <h1 style={{
                backgroundColor: "#131129",
                color: "white",
                fontSize: "40px",
                fontWeight: "bolder",
                resize: "none",
                outline: "none",
                width: "100%",
                border: "none",
              }}>
                {blog.title}
            </h1>
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
            <article 
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
              }}>
                {blog.blog}
            </article>
          </Card>
      </Box>
    </div>
  );
};

export default BlogDetails;
