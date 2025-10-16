import React from "react";
import { Box, Paper, Typography, TextField, Button, Link } from "@mui/material";
import BackButton from "../../components/backbutton";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import validator from "email-validator";
import {login} from "../../utils/api_users";
import { toast } from "sonner";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['currentuser']);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async () => {
    try {
      // 1. check for error
      if (!email || !password) {
        toast.error("Please fill up all the fields");
      } else {
        const userData = await login(email, password);
        console.log(userData);
        //set cookies
        setCookie("currentuser", userData, {
          maxAge: 60 * 60 * 8, //expires in 8 hours
        });
        toast.success("You have successfully logged in!");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
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
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Please log in to your account
          </Typography>

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
            Log In
          </Button>

          <Typography variant="body2" mt={3}>
            Don’t have an account?{" "}
            <Link href="/signup" underline="hover" sx={{ color: "#2596BE" }}>
              Sign up
            </Link>
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
