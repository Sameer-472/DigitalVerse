import { Box, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { MenuList, ListItemIcon, ListItemText } from "@mui/material";

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto auto auto ",
          backgroundColor: "#191C1F",
          color: "white",
          justifyContent: "center",
          columnGap: "400px",
        }}
      >
        <Box>
          <h3>Stay in the loop</h3>
          <input
            type="text"
            placeholder="Enter your email"
            id="footerInput"
            required
            step="any"
          />
        </Box>
        <Box>
          <h3>Marketplace</h3>
          <p>
            <Link id="footerLinks" to="/explore">
              Explore
            </Link>
          </p>
          <p>
            <Link id="footerLinks" to="/createNft">
              Create item
            </Link>
          </p>
         
        </Box>
        <Box>
          <MenuList>
            <a href="https://twitter.com/Sameerkhan_45">
              <MenuItem>
                <ListItemIcon>
                  <TwitterIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText sx={{ textDecoration: "none", color: "white" }}>
                  Twitter
                </ListItemText>
              </MenuItem>
            </a>
            <a href="https://www.instagram.com/skywalker_sameer/">
              <MenuItem>
                <ListItemIcon>
                  <InstagramIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText sx={{ textDecoration: "none", color: "white" }}>
                  Instagram
                </ListItemText>
              </MenuItem>
            </a>
            <a href="https://www.facebook.com/profile.php?id=100009529212122">
              <MenuItem>
                <ListItemIcon>
                  <FacebookIcon
                    sx={{ color: "white" }}
                  />
                </ListItemIcon>
                <ListItemText sx={{ textDecoration: "none", color: "white" }}>Facebook</ListItemText>
              </MenuItem>
            </a>
          </MenuList>
        </Box>
      </Box>
      <Box
        sx={{ color: "white", backgroundColor: "#191C1F", textAlign: "center" }}
      >
        &copy; DigitalVerse, Inc
      </Box>
    </>
  );
};

export default Footer;
