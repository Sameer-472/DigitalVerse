import { Box } from "@mui/material";
import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div>
      <Box sx={{backgroundColor: '#191C1F'}}>
        <Box>
          <Box sx={{display: 'flex' , flexDirection: 'row' , justifyContent: 'space-around' , alignItems:'center'}}>
          <Box id="teamMembers">
            <img src="./assets/sameer.jpg" alt="" id="teamPic" />
            <div id="abouttext">
              <h2 id="name">Muhammad Sameer</h2>
              <p style={{ width: "200px", textAlign:'center'}}>
                I there i am a React developer and a aspiring Blockchain developer recently i have done my graduation
                from university of Sindh in information technology and always ready to explore new tech , innovation
                & open for work.
              </p>
            </div>
          </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default AboutUs;
