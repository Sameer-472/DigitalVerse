import axios from "axios";

//  fetching the user blogs using his/her wallet address
export const fetchUserBlogs = async (payload) => {
  console.log("function called from services");
  try {
    const data = await axios.post("http://localhost:8000/myBlogs", payload);
    return data.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

