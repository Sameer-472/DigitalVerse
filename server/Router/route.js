import express from "express";
import { postBlog , fetchAllBlogs, myBlogs , getSingleData , deleteData , editSingleData} from "../controller/blog.js";
import { connectWallet } from "../controller/connectWallet.js";
import { createNFT } from "../controller/createNFT.js";
import { myNfts } from "../controller/myNfts.js";



const router = express.Router();

router.post("/connectWallet" , connectWallet);
router.put("/createItem" , createNFT);
router.post("/myNFTs" , myNfts);
router.post("/postBlog" , postBlog);
router.get("/all" , fetchAllBlogs);
router.post("/myBlogs" , myBlogs);
router.post("/all/:id" , getSingleData);
router.delete("/deleteBlog/:id" , deleteData);
router.put("/editSingleData/:id" , editSingleData);

export default router;


