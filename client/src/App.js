import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Home from "./Pages/Home/Home";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { CreateNFT } from "./Pages/CreateNFT/CreateNFT";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import Explore from "./Pages/Explore/Explore";
import MyNfts from "./Pages/MyNfts/MyNfts";
import Blogs from "./Pages/Blogs/Blogs";
import ExploreIcon from "@mui/icons-material/Explore";
import AppsIcon from "@mui/icons-material/Apps";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { AddBlog } from "./Pages/AddBlog/AddBlog";
import BlogDetails from "./components/BlogDetails/BlogDetails";
import MyBlogs from "./components/MyBlogs/MyBlogs";
import { EditBlog } from "./Pages/EditBlog/EditBlog";
import Footer from "./components/Footer/Footer";
import DetailPage from "./components/DetailPage/DetailPage";
import AboutUs from "./Pages/About us/AboutUs";

const drawerWidth = 240;

export default function App() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Router>
          <SideDrawer id='box'/>
        <Box>
        <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Routes>
            <Route path="/createNFT" element={<CreateNFT />} />
          </Routes>
          <Routes>
            <Route path="/explore" element={<Explore />} />
          </Routes>
          <Routes>
            <Route path="/explore/:id" element={<DetailPage />} />
          </Routes>
          <Routes>
            <Route path="/mynfts" element={<MyNfts />} />
          </Routes>
          <Routes>
            <Route path="/mynfts/:id" element={<DetailPage />} />
          </Routes>
          <Routes>
            <Route path="/blogs" element={<Blogs />}/>
          </Routes>
          <Routes>
            <Route path="/blogs/:id" element={<BlogDetails />} />
          </Routes>
          <Routes>
            <Route path="/addBlog" element={<AddBlog />} />
          </Routes>
          <Routes>
            <Route path ='/myBlogs' element={<MyBlogs/>}/>
          </Routes>
          <Routes>
            <Route path ='/aboutus' element={<AboutUs/>}/>
          </Routes>
          <Routes>
            <Route path ='/myBlogs/:id' element={<EditBlog/>}/>
          </Routes>
        </Box>
        <Footer/>
      </Router>
    </>
  );
}


