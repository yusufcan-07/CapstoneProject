import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./styles.css";
const FormDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <button
        className="text-4xl text-gray-500 cursor-pointer mb-2"
        onClick={handleClickOpen} // Toggle the modal state when the button is clicked
      >
        +
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Stock Add</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ paddingBottom: 2 }}>
            Choose the stock that you want to add your Watchlist!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Stock Name"
            type="stock"
            fullWidth
            InputLabelProps={{
              className: "input-label", // Add a class to the input label
            }}
            InputProps={{
              className: "input-field", // Add a class to the input field
            }}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "gray", // Border color when focused
                },
            }}
          />
        </DialogContent>
        <DialogActions>
          <button
            className="text-xl text-gray-500 mr-2 p-2"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="text-xl text-gray-500 mr-2 p-2"
            onClick={handleClose}
          >
            Add
          </button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default FormDialog;
