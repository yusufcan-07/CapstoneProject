import * as React from "react";
import Dialog from "@mui/material/Dialog";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { auth } from "../../Config/firebase";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import RegistrationPopup from "./RegisterButton";
import "./buttonStyles.css";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useContext } from "react";
import { UserContext } from "../../Config/UserContext";

const LoginRegisterPopup = ({ onAuth }) => {
  const { isAuth, setIsAuth, profile, setProfile } = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const handleRegisterLinkClick = () => {
    setOpen(false); // Close the login popup
    setIsRegisterPopupOpen(true); // Open the registration popup
  };

  const handleRegisterPopupClose = () => {
    setIsRegisterPopupOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEmailLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      setEmailError("");
      setPasswordError("");
      onAuth({ user: userCredential.user, method: "email" });
      handleClose();
    } catch (error) {
      console.error("Firebase Error:", error);

      // Check and handle specific error codes
      if (error.code === "auth/invalid-credential") {
        setPasswordError("Incorrect password");
      } else if (error.code === "auth/user-not-found") {
        setEmailError("User not found");
      } else if (error.code === "auth/invalid-email") {
        setEmailError("Invalid account");
      } else {
        // Generic error message for other types of errors
        setEmailError("Login failed. ");
        setPasswordError("Please try again.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      onAuth({ user: result.user, method: "google" });
      handleClose();
    } catch (error) {
      console.error(error);
      // Handle Google login errors
      setEmailError("Google login failed");
    }
  };
  const handleAuthentication = ({ user, method }) => {
    if (user) {
      // Set user authenticated state, profile info, etc.
      setIsAuth(true);
      setProfile(user);

      // You might want to do something different depending on the method
      if (method === "email") {
        // Email login specific logic
      } else if (method === "google") {
        // Google login specific logic
      } else if (method === "register") {
        // Registration specific logic
      }
    }
  };

  return (
    <div className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out">
      <React.Fragment>
        <Button
          onClick={handleClickOpen}
          sx={{
            bgcolor: "indigo.600",
            ":hover": { bgcolor: "indigo.700" },
            color: "white",
            fontWeight: "bold",
            borderRadius: 2,
            textTransform: "none", // To avoid uppercase transformation
            fontSize: "1rem",
            py: 1,
            px: 3,
            transition: "background-color 300ms ease-in-out",
          }}
        >
          Login/Register
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{ m: 0, p: 2, textAlign: "center" }}>
            Login
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Use your email and password to login.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
              error={!!passwordError}
              helperText={passwordError}
            />
            <Button
              onClick={handleEmailLogin}
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "purple.500", // Change to your preferred shade of purple
                ":hover": { bgcolor: "purple.700" }, // Darker purple on hover
                color: "white",
                mb: 2,
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={handleGoogleLogin}
              sx={{
                bgcolor: "purple.500", // Use the same purple shade for consistency
                ":hover": { bgcolor: "purple.700" },
                color: "white",
                mt: 2, // Add margin top if you want space between the buttons
              }}
            >
              Login with Google
            </Button>
            <DialogContentText sx={{ textAlign: "center", mt: 2 }}>
              <Link
                href="#"
                onClick={handleRegisterLinkClick}
                sx={{ color: "primary.main", cursor: "pointer" }}
              >
                Don't have an account? Register!
              </Link>
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <RegistrationPopup
          open={isRegisterPopupOpen}
          onClose={handleRegisterPopupClose}
          onAuth={(data) => handleAuthentication(data)}
        />
      </React.Fragment>
    </div>
  );
};

export default LoginRegisterPopup;
