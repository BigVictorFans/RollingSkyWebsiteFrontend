import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { People as PeopleIcon, SportsEsports as GamepadIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/appbar";
import BackButton from "./components/backbutton";
import Note from "@mui/icons-material/Note";
import { useCookies } from "react-cookie";


const AdminDashboard = () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['currentuser']);
  
    const currentUser = cookies.currentuser;
    const isLoggedIn = !!currentUser;
    const isAdmin = currentUser?.role === "admin";
  return (
    <>
      <Navbar />
      <BackButton />
      {isAdmin && (
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
            Admin Dashboard
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
              onClick={() => navigate("/admin/manageusers")}
              sx={{
                flex: 1,
                py: 4,
                fontSize: "1.2rem",
                fontWeight: "bold",
                borderRadius: 3,
              }}
            >
              Manage Users
            </Button>

            <Button
              variant="contained"
              color="warning"
              startIcon={<GamepadIcon />}
              onClick={() => navigate("/admin/managelevels")}
              sx={{
                flex: 1,
                py: 4,
                fontSize: "1.2rem",
                fontWeight: "bold",
                borderRadius: 3,
              }}
            >
              Manage Levels
            </Button>

            <Button
              variant="contained"
              color="warning"
              startIcon={<Note />}
              onClick={() => navigate("/admin/managepostcategories")}
              sx={{
                flex: 1,
                py: 4,
                fontSize: "1.2rem",
                fontWeight: "bold",
                borderRadius: 3,
              }}
            >
              Manage Post Categories
            </Button>
          </Stack>
        </Box>
      )}
      
    </>
  );
};

export default AdminDashboard;
