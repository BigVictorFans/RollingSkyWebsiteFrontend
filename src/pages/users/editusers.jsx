import React from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import Navbar from "../../components/appbar";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/backbutton";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { getUserById, editUser } from "../../utils/api_users";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { API_URL } from "../../utils/constants"; // adjust the import path as necessary
import { styled } from "@mui/system";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const EditUserPage = () => {
      const { id } = useParams(); // retrieve the id from the URL
      const navigate = useNavigate();
      const [cookies] = useCookies(["currentuser"]);
      const { currentuser = {} } = cookies; // assign empty object to avoid error if user not logged in
      const { token = "" } = currentuser;
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [role, setRole] = useState("");
      const [error, setError] = useState("");
  
    // load the user data from the backend API, and assign it the state
    useEffect(() => {
      getUserById(id)
        .then((userData) => {
          // check if userData is empty or not
          if (userData) {
            // update the state with the userData
            setName(userData ? userData.name : "");
            setEmail(userData ? userData.email : "");
            setRole(userData ? userData.role : "");
          } else {
            // if not available, set error message
            setError("user not found");
          }
        })
        .catch((error) => {
          // catch the API error
          setError("user not found");
        });
    }, [id]);
  
  
    const handleFormSubmit = async (event) => {
      // 1. check for error
      if (!name || !email || !role) {
        toast.error("Please fill up the required fields");
      }
  
      try {
        // 2. trigger the API to update user
        await editUser(id, name, email, role, token);
  
        // 3. if successful, redirect user back to home page and show success message
        toast.success("user has been updated");
        navigate("/admin");
      } catch (error) {
        toast.error(error.message);
      }
    };
  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#2596BE",
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
            maxWidth: 500,
            borderRadius: 3,
            backgroundColor: "#f5f5f5",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              textAlign: "center",
              fontWeight: "bold",
              color: "#2596BE",
            }}
          >
            Edit User
          </Typography>

          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="name"
              variant="outlined"
              fullWidth
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                label="Role"
              >
                <MenuItem value="admin">admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#2596BE",
                "&:hover": { backgroundColor: "#1e7ca0" },
              }}
              onClick={handleFormSubmit}
            >
              Save Changes
            </Button>

            <Button
              variant="outlined"
              sx={{
                mt: 1,
                borderColor: "#2596BE",
                color: "#2596BE",
                "&:hover": {
                  backgroundColor: "#e0f4fa",
                  borderColor: "#2596BE",
                },
              }}
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default EditUserPage;
