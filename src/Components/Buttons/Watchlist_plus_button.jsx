import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./buttonStyles.css";
const WatchlistPlusButton = ({ onAddStock }) => {
  const [open, setOpen] = React.useState(false);
  const [stockName, setStockName] = React.useState("");
  const [stockPrice, setStockPrice] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddStock = () => {
    // Validate stockName and stockPrice if needed
    onAddStock(stockName, parseFloat(stockPrice));
    setStockName("");
    setStockPrice("");
    handleClose();
  };

  return (
    <React.Fragment>
      <button
        className="text-4xl text-gray-500 cursor-pointer mb-2"
        onClick={handleClickOpen}
      >
        +
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Hisse Ekle</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ paddingBottom: 2 }}>
            İzlemek istediğiniz hisseyi girin!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Hisse Kodu"
            type="stock"
            fullWidth
            value={stockName}
            onChange={(e) => setStockName(e.target.value)}
            InputLabelProps={{
              className: "input-label",
            }}
            InputProps={{
              className: "input-field",
            }}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "gray",
                },
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Hisse Fiyatı"
            type="number" // Use type="number" for price
            fullWidth
            value={stockPrice}
            onChange={(e) => setStockPrice(e.target.value)}
            InputLabelProps={{
              className: "input-label",
            }}
            InputProps={{
              className: "input-field",
            }}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "gray",
                },
            }}
          />
        </DialogContent>
        <DialogActions>
          <button
            className="text-xl text-gray-500 mr-2 p-2"
            onClick={handleClose}
          >
            Kapat
          </button>
          <button
            className="text-xl text-gray-500 mr-2 p-2"
            onClick={handleAddStock}
          >
            Ekle
          </button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default WatchlistPlusButton;
