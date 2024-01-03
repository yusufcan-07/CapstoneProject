import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./buttonStyles.css";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const PortfolioPlusButton = ({ onAddTrade }) => {
  const [open, setOpen] = useState(false);
  const [stockName, setStockName] = useState("");
  const [stockAmount, setStockAmount] = useState("");

  const [stockBuyPrice, setStockBuyPrice] = React.useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddTrade = () => {
    // Validate inputs if needed
    const newTrade = {
      stockName,
      amount: parseInt(stockAmount),
      buyPrice: parseFloat(stockBuyPrice),
      livePrice: 100, // You can set a default value or fetch it from somewhere
      dateTime: selectedDate.toLocaleDateString("en-GB"),
    };

    onAddTrade(newTrade);
    setStockName("");
    setStockAmount("");
    setStockBuyPrice("");
    setSelectedDate("");
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
        <DialogTitle>İşlem Ekleme</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ paddingBottom: 2 }}>
            Hisselerinizi ekleyin!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Hisse Kodu"
            type="stock"
            fullWidth
            value={stockName}
            onChange={(e) => setStockName(e.target.value.toUpperCase())}
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
            label="Lot Sayısı"
            type="number" // Use type="number" for price
            fullWidth
            value={stockAmount}
            onChange={(e) => setStockAmount(e.target.value)}
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
            label="Alış Fiyatı"
            type="number" // Use type="number" for price
            fullWidth
            value={stockBuyPrice}
            onChange={(e) => setStockBuyPrice(e.target.value)}
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
          <label htmlFor="date" className="m-4">
            Tarih Seçin:
          </label>
          <DatePicker
            id="date"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            className="w-full p-2 border border-gray-300 rounded-md"
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
            onClick={handleAddTrade}
          >
            Ekle
          </button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default PortfolioPlusButton;
