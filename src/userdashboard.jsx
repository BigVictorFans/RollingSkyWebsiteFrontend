import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { People as PeopleIcon, SportsEsports as GamepadIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/appbar";
import BackButton from "./components/backbutton";
import Note from "@mui/icons-material/Note";
import { useCookies } from "react-cookie";


const UserDashboard = () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['currentuser']);
  
    const currentUser = cookies.currentuser;
    const isLoggedIn = !!currentUser;
    const isAdmin = currentUser?.role === "admin";

  return (
    <>
      <Navbar />
      <BackButton />
        <Box
          sx={{
            bgcolor: "#2596BE",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
          }}
        >
          {/* Title */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "white",
              mb: 5,
              textAlign: "center",
            }}
          >
            Welcome to Users Dashboard, {currentUser.name}
          </Typography>

          {/* Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={4}
            sx={{ width: "100%", maxWidth: 600, justifyContent: "center" }}
          >
            <Button
              variant="contained"
              color="warning"
              startIcon={<PeopleIcon />}
              onClick={() => navigate("/changeusername")}
              sx={{
                flex: 1,
                py: 4,
                fontSize: "1.2rem",
                fontWeight: "bold",
                borderRadius: 3,
              }}
            >
              Change your name
            </Button>

            <Button
              variant="contained"
              color="warning"
              startIcon={<GamepadIcon />}
              onClick={() => navigate("/manageposts")}
              sx={{
                flex: 1,
                py: 4,
                fontSize: "1.2rem",
                fontWeight: "bold",
                borderRadius: 3,
              }}
            >
              {isAdmin !== true ?
                    (
                        <Typography>Manage Your Posts</Typography>
                    ):
                    (
                        <Typography>Manage All User Posts</Typography>
                    )
               }
            </Button>
          </Stack>
        </Box>
      
      
    </>
  );
};

export default UserDashboard;
