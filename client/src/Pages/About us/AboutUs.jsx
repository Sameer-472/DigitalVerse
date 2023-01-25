import { Box } from "@mui/material";
import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div>
      <Box sx={{backgroundColor: '#191C1F'}}>
        <Box>
          <h1 id="aboutHeading">Team</h1>
          <p id="abouttext">
            This project is maintained by group by invaluable contributors with their
            massive support and efforts
          </p>
          <Box sx={{display: 'flex' , flexDirection: 'row' , justifyContent: 'space-around', mt: 10 , alignItems:'center'}}>
          <Box id="teamMembers">
            <img src="./assets/kashif.jpg" alt="" id="teamPic" />
            <div id="abouttext">
              <h2 id="name">Kashif Ali khan</h2>
              <p style={{ width: "200px" }}>
                He has done front end using React integrate backend APIs and smart contract in React 
                and all the research related work of this project and write down some 
                chapter of thesis which are belongs to this project
                 and contribute his dedication and efforts.
              </p>
            </div>
          </Box>
          <Box id="teamMembers">
            <img src="./assets/sameer.jpg" alt="" id="teamPic" />
            <div id="abouttext">
              <h2 id="name">Muhammad Sameer</h2>
              <p style={{ width: "200px", textAlign:'center'}}>
                He manage and develop the backend of this project and create the
                whole architecture of this project. Develop the server using
                node.js , MongoDB , and Express and also create the smart
                contract in solidity.
              </p>
            </div>
          </Box>
          <Box id="teamMembers">
            <img src="./assets/rameeza.jpg" alt="" id="teamPic" />
            <div id="abouttext">
              <h2 id="name">Rameeza Arain</h2>
              <p style={{ width: "200px" }}>
                Most of the arts uploaded in this project are created by our valuable member Rameeza Arain 
                she has done fantastic job in the creation of unique art works and also wrote some chapters of thesis which are related to this project.
              </p>
            </div>
          </Box>
          </Box>
    
        </Box>
        <Box sx={{ textAlign: "center", padding: "50px"}}>
          <h1 id="aboutHeading">About us</h1>
          <p id="abouttext">
            we're excited about a brand new type of digital good
            called a non-fungible token, or NFT. NFTs have exciting new
            properties: they’re unique, provably scarce, tradeable, and usable
            across multiple applications. Just like physical goods, you can do
            whatever you want with them! You could throw them in the trash, gift
            them to a friend across the world, or go sell them on an open
            marketplace. But unlike physical goods, they're armed with all the
            programmability of digital goods. A core part of our vision is that
            open protocols like Ethereum and interoperable standards like
            ERC-721 and ERC-1155 will enable vibrant new economies. We're
            building tools that allow consumers to trade their items freely,
            creators to launch new digital works, and developers to build rich,
            integrated marketplaces for their digital items. We’re proud to be
            the first and largest marketplace for NFTs.
          </p>
        </Box>
      </Box>
    </div>
  );
};

export default AboutUs;
