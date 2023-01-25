import Blog from '../model/blog.js'

// post blog 
export const postBlog=async(req,res)=>{
    const userBlog=req.body;
       const saveBlog= new Blog(userBlog);
       try {
        await saveBlog.save();
        console.log(saveBlog);
        res.status(201).json(saveBlog);
       } catch (error) {
        res.status(409).json({message:error.message});
       }
}

//fetching all data from the database

export const fetchAllBlogs=async(req,res)=>{
    try {
      const allData= await Blog.find({}).sort({createdAt:-1});
      res.status(200).json(allData);
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const myBlogs = async(req , res)=>{
    const {address} = req.body
    try {
        const blogs = await Blog.find({address: address});
        if(blogs){
            return res.status(200).json({blogs: blogs})
        }
        else{
            return res.status(401).json({"message": "data not found"})
        }
    } catch (error) {
        console.log(error)
    }
}

//Getting Single Data

export const getSingleData=async(req,res)=>{
    const id=req.params.id;
    try {
      const blog = await Blog.findById(id);
      res.status(200).json(blog);
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

// gettig single blog 
export const editSingleData=async(req,res)=>{
    const id =req.params.id;
    const blog =req.body;
    const editData=new Blog(blog)
    try {
        await Blog.updateOne({_id:id},editData)
        res.status(201).json(editData);
    } catch (error) {
        res.status(409).json({message:error.message})

        
    }
}

// delete
export const deleteData=async(req,res)=>{
    const id=req.params.id;
    try {
        await Blog.deleteOne({_id:id});
        res.status(200).json(
            'Data Deleted'
        )
    } catch (error) {
        res.status(409).json({message:error.message})
        
    }
}

