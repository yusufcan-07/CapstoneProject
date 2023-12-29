import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./buttonStyles.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Config/firebase";
import { useContext } from "react";
import { updateProfile } from "firebase/auth";
import { UserContext } from "../../Config/UserContext";
const RegistrationPopup = ({ open, onClose, onAuth }) => {
  const { isAuth, setIsAuth, profile, setProfile } = useContext(UserContext);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Set the display name in Firebase Authentication
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      });

      // Now call onAuth with updated user information
      onAuth({
        user: {
          ...userCredential.user,
          displayName: `${firstName} ${lastName}`, // Pass the new display name
        },
        method: "register",
      });

      onClose(); // Close the modal
    } catch (error) {
      console.error(error);
      // Handle errors such as user already exists, etc.
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter your details to create an account.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="firstName"
          label="First Name"
          type="text"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="lastName"
          label="Last Name"
          type="text"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleRegister}>Register</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegistrationPopup;
