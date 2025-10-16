import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import Navbar from "../../components/appbar";
import BackButton from "../../components/backbutton";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getUserById, editUser } from "../../utils/api_users";
import { toast } from "sonner";

const ChangeUserName = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { _id: userId = "", token = "" } = currentuser;

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  // Load the current user's data
  useEffect(() => {
    if (!userId) {
      setError("User not found or not logged in.");
      return;
    }

    getUserById(userId)
      .then((userData) => {
        if (userData) setName(userData.name);
        else setError("User not found");
      })
      .catch(() => setError("Failed to load user info"));
  }, [userId]);

  // Handle username update
  const handleFormSubmit = async () => {
    if (!name.trim()) {
      toast.error("Please enter a valid username");
      return;
    }

    try {
      await editUser(userId, name, currentuser.email, currentuser.role, token);

      // Update local cookie (so navbar or other pages show updated name)
      setCookie(
        "currentuser",
        { ...currentuser, name },
        { path: "/", sameSite: "strict" }
      );

      toast.success("Username updated successfully!");
      navigate("/"); // redirect wherever your profile page is
    } catch (error) {
      toast.error("Failed to update username");
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <BackButton />
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
            Edit Username
          </Typography>

          {error ? (
            <Typography color="error" textAlign="center">
              {error}
            </Typography>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

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
          )}
        </Paper>
      </Box>
    </>
  );
};

export default ChangeUserName;
