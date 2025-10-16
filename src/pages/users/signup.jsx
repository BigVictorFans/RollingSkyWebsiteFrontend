import React from "react";
import { Box, Paper, Typography, TextField, Button, Link } from "@mui/material";
import BackButton from "../../components/backbutton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import validator from "email-validator";
import { signup } from "../../utils/api_users";
import { toast } from "sonner";

const Signup = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['currentuser']);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFormSubmit = async () => {
    try {
      // 1. check for error
      if (!name || !email || !password || !confirmPassword) {
        toast.error("Please fill up all the fields");
        console.log("empty fields");
      } else if (!validator.validate(email)) {
        // 2. make sure the email is valid
        toast.error("Please use a valid email address");
        console.log("invalid email");
      } else if (password !== confirmPassword) {
        // 2. check for password match
        toast.error("Password is not match");
        console.log("password not match");
      } else {
        const userData = await signup(name, email, password);
        console.log(userData);
        //set cookies
        setCookie("currentuser", userData, {
          maxAge: 60 * 60 * 8, //expires in 8 hours
        });
        toast.success("You have successfully signed up an account!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <>
        <BackButton />
      <Box
        sx={{
          backgroundColor: "#2596BE",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 400,
            borderRadius: 3,
            backgroundColor: "#fff",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Join us and start your journey
          </Typography>

          <TextField
            label="Username"
            fullWidth
            value={name}
            margin="normal"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              backgroundColor: "#2596BE",
              "&:hover": { backgroundColor: "#1d7ba0" },
            }}
            onClick={handleFormSubmit}
          >
            Sign Up
          </Button>

          <Typography variant="body2" mt={3}>
            Already have an account?{" "}
            <Link href="/login" underline="hover" sx={{ color: "#2596BE" }}>
              Log in
            </Link>
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default Signup;
