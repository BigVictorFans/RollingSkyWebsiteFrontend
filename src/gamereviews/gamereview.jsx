import React from "react";
import {
  Box,
  Typography,
  Paper,
  Rating,
  Button,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Navbar from "../components/appbar";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { TabContext, TabList, TabPanel } from '@mui/lab';
import BackButton from "../components/backbutton";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { getGameReviews } from "../utils/api_gamereviews";
import { API_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { Delete } from "@mui/icons-material";


const GameReviewsPage = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies; // assign empty object to avoid error if user not logged in
  const { token = "" } = currentuser;
  // to store the data from /levels
  const [gamereviews, setGamereviews] = useState([]);
  const [tabValue, setTabValue] = React.useState("5");
  const [rating, setRating] = React.useState(tabValue || "5");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setRating(newValue);
  };

  useEffect(() => {
    getGameReviews(rating).then((data) => {
      setGamereviews(data);
      console.log(rating);
    });
  }, [rating]);

  return (
    <>
        <Navbar />
        <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: "center",  }}>
                <TabList onChange={handleTabChange} sx={{ mx: "auto" }}>
                    <Tab label="5 Stars" value="5" />
                    <Tab label="4 Stars" value="4" />
                    <Tab label="3 Stars" value="3" />
                    <Tab label="2 Stars" value="2" />
                    <Tab label="1 Star"  value="1" />
                </TabList>
            </Box>
        </TabContext>
        <BackButton />
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#2596BE",
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
            >
            {/* Page Title and Add Review Button */}
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                width: "100%",
                maxWidth: 700,
                mb: 3,
                }}
            >
                <Typography
                variant="h4"
                sx={{ color: "white", fontWeight: "bold" }}
                >
                Game Reviews
                </Typography>
                <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                    backgroundColor: "white",
                    color: "#2596BE",
                    fontWeight: "bold",
                    "&:hover": {
                    backgroundColor: "#e3f2fd",
                    },
                }}
                onClick={() => navigate("/gamereviews/add")}
                >
                Add Review
                </Button>
            </Stack>

            {/* Reviews List */}
            <Box
                sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                width: "100%",
                maxWidth: 700,
                overflowY: "auto",
                }}
            >
                {gamereviews.map((review) => (
                <Paper
                    key={review.id}
                    elevation={4}
                    sx={{
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: "white",
                    }}
                >
                    <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    >
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "#2596BE" }}
                    >
                        {review.title}
                    </Typography>
                    </Stack>

                    <Rating value={review.rating} readOnly sx={{ mt: 1, mb: 2 }} />

                    <Typography variant="body1" sx={{ mb: 2 }}>
                    {review.content}
                    </Typography>

                    <Typography
                    variant="subtitle2"
                    sx={{ color: "gray", textAlign: "right" }}
                    >
                    — {review.userId?.name || "Unknown"}
                    </Typography>
                </Paper>
                ))}
            </Box>
        </Box>
    </>
  );
};

export default GameReviewsPage;
