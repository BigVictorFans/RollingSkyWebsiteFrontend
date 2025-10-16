import React from "react";
import { Box, Typography } from "@mui/material";
import Navbar from "../components/appbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function HeroSection() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentuser"]);
  const currentUser = cookies.currentuser; // 👈 get user info from cookies

  return (
    <> 
      <Navbar />
      <Box
        sx={{
          position: "relative",
          height: "93.4vh",
          backgroundImage: "url('/images/MassifMountains.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        {/* dark overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        />

        {/* text in front */}
        <Box sx={{ textAlign: "center", zIndex: 2 }}>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            Welcome to Rolling Sky's Official Website!
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, mx: 2 }}>
            Dive into the world of Rolling Sky, explore levels, share your experiences, and connect with fellow enthusiasts!
          </Typography>

          {/* 👇 only show this if user is logged in */}
          {currentUser && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">
               Welcome Back! <strong>{currentUser.name} <br/> email: {currentUser.email}</strong> 
              </Typography>
            </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mx: 2, mt:4 }}>
            <Button
              variant="contained"
              color="warning"
              sx={{
                fontWeight: 600,
                px: 3,
                py: 1,
              }}
            >
              <a
                target="blank"
                href="https://www.taptap.io/app/33603857"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Download Now!
              </a>
            </Button>

            <Button
              variant="outlined"
              color="inherit"
              sx={{
                fontWeight: 600,
                px: 3,
                py: 1,
                borderWidth: 2,
                "&:hover": {
                  borderWidth: 2,
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
              onClick={() => navigate("/posts")}
            >
              Check Out The Community's Posts!
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
