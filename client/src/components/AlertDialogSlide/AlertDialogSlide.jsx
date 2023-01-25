import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { ListItemIcon, ListItemText, MenuItem, MenuList } from "@mui/material";
import axios from "axios";
import { useSelector , useDispatch} from "react-redux";
import { getMyBlogs } from "../../Redux/Action/getMyBlogs";



export default function AlertDialogSlide(prop) {
  const [open, setOpen] = React.useState(false);
  const result = useSelector((state)=> state);
  const dispatch = useDispatch();
  console.log(prop)
  const { id } = prop;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteBlog = async (id) => {
    try {
      const blog = await axios.delete(`http://localhost:8000/deleteBlog/${id}`);
      console.log(blog.data);
      await dispatch(getMyBlogs({address: result.user.user.user.userWalletAddress}))
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
    // fetchUserBlogs();
  };

  return (
    <div>
      <MenuList>
        <MenuItem onClick={handleClickOpen}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText onClick={() => console.log(id)}>Delete</ListItemText>
        </MenuItem>
      </MenuList>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"  
        sx={{backgroundColor: '#191A41' , color: 'white'}}
        >
          {"Are you sure you want to delete it?"}
        </DialogTitle>
        
        <DialogActions 
        sx={{backgroundColor: '#191A41', color: 'white'}}
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=> {deleteBlog(id)}} >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
