import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ListItemIcon, ListItemText, MenuItem, MenuList } from "@mui/material";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import { useNavigate } from "react-router-dom";
import { getEllipsisTxt } from "../../helpers/formatter";

export default function DisconnectWallet(prop) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { account } = prop;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MenuList>
        <MenuItem onClick={handleClickOpen}>
          <Button variant="outlined" id="connectWalletButton" sx={{color: 'black' , backgroundColor: 'white'}}>
            {getEllipsisTxt(account)}
          </Button>
        </MenuItem>
      </MenuList>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ backgroundColor: "#191A41", color: "white" }}
        >
          {/* {account}
          <ContentCopyRoundedIcon
            onClick={() =>  navigator.clipboard.writeText(account)}
          /> */}
          <Button
            endIcon={
              <ContentCopyRoundedIcon
                onClick={() => navigator.clipboard.writeText(account)}
              />
            }
            sx={{ fontSize: "20px" , color: "yellowgreen"}}
          >
            {account}
          </Button>
        </DialogTitle>

        <DialogActions sx={{ backgroundColor: "#191A41", color: "white" }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            color="error"
            onClick={() => {
              navigate(0);
              sessionStorage.removeItem("user");
            }}
          >
            Disconnect
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
