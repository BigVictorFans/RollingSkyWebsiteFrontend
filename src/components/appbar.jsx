import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function Navbar() {
  const [cookies, setCookie, removeCookie] = useCookies(['currentuser']);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  // 🧠 get current user and role from cookies
  const currentUser = cookies.currentuser;
  const isLoggedIn = !!currentUser;
  const isAdmin = currentUser?.role === "admin";

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#FBC43D", color: "black" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            onClick={() => setOpen(!open)}
            sx={{ display: { xs: "block", md: "none" }, color: "black" }}
          >
            <MenuIcon />
          </IconButton>

          {/* Title + Image Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              component="img"
              src="/images/images.jpg"
              alt="Rolling Sky Logo"
              sx={{
                width: 32,
                height: 32,
                borderRadius: "6px",
              }}
            />
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              ROLLING SKY
            </Typography>
          </Box>
        </Box>

        {/* Right side (desktop) */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          {/* ✅ Only admins see this */}
          {isAdmin && (
            <Button sx={{ color: "black", fontWeight: 700 }} onClick={() => navigate("/admin")}>
              Admin Dashboard
            </Button>
          )}
          <Button sx={{ color: "black", fontWeight: 700 }} onClick={() => navigate("/updatelogs")}>
            Updatelogs
          </Button>
          <Button sx={{ color: "black", fontWeight: 700 }} onClick={() => navigate("/gamereviews")}>
            REVIEW THE GAME!
          </Button>
          <Button sx={{ color: "black", fontWeight: 700 }} onClick={() => navigate("/levels")}>
            LEVELS
          </Button>
          <Button sx={{ color: "black", fontWeight: 700 }} onClick={() => navigate("/posts")}>
            POSTS
          </Button>

          {/* ✅ Only show signup/login if NOT logged in */}
          {!isLoggedIn && (
            <>
              <Button sx={{ color: "black", fontWeight: 700 }} onClick={() => navigate("/signup")}>
                SIGNUP
              </Button>
              <Button sx={{ color: "black", fontWeight: 700 }} onClick={() => navigate("/login")}>
                LOGIN
              </Button>
            </>
          )}

          {/* ✅ Only show logout if logged in */}
          {isLoggedIn && (
            <Button
              sx={{ color: "black", fontWeight: 700 }}
              onClick={() => {
                removeCookie("currentuser");
                toast.success("You have successfully logged out!");
                navigate("/");
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>

      {/* Mobile menu */}
      {open && (
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            backgroundColor: "#FBC43D",
            px: 2,
            pb: 1,
          }}
        >
          <Button sx={{ color: "black" }}>REVIEW THE GAME!</Button>
          <Button sx={{ color: "black" }}>LEVELS</Button>
          <Button sx={{ color: "black" }}>POSTS</Button>
          <Button sx={{ color: "black" }}>SIGNUP</Button>
          <Button sx={{ color: "black" }}>LOGIN</Button>
        </Box>
      )}
    </AppBar>
  );
}
