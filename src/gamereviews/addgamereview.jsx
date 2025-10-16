import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Stack,
  Paper,
} from "@mui/material";
import Navbar from "../components/appbar";
import BackButton from "../components/backbutton";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { addGameReview } from "../utils/api_gamereviews";
import { toast } from "sonner";
import { styled } from "@mui/system";
import { API_URL } from "../utils/constants"; // adjust the import path as necessary

const AddGameReviewPage = () => {
      const navigate = useNavigate();
    const [cookies] = useCookies(["currentuser"]);
    const { currentuser = {} } = cookies; // assign empty object to avoid error if user not logged in
    const { token = "" } = currentuser;
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(0);


    const handleFormSubmit = async (event) => {
    // 1. check for error
    if (!title || !content || !rating) {
      toast.error("Please fill up the required fields");
    }

    try {
      // 2. trigger the API to create new review
      await addGameReview(title, content, rating, token);

      // 3. if successful, redirect user back to home page and show success message
      toast.success("New review has been added");
      navigate("/gamereviews");
    } catch (error) {
      toast.error(error.message);
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
                p: 3,
            }}
            >
            <Paper
                elevation={6}
                sx={{
                p: 4,
                width: "100%",
                maxWidth: 600,
                borderRadius: 3,
                }}
            >
                <Typography
                variant="h4"
                sx={{ mb: 3, color: "#2596BE", fontWeight: "bold", textAlign: "center" }}
                >
                Add Game Review
                </Typography>

                <Stack spacing={3}>
                <TextField
                    fullWidth
                    label="Review Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <Box>
                    <Typography sx={{ mb: 1, fontWeight: "bold" }}>Rating</Typography>
                    <Rating
                    name="game-rating"
                    value={rating}
                    onChange={(e, newValue) => setRating(newValue)}
                    />
                </Box>

                <TextField
                    fullWidth
                    label="Review Content"
                    variant="outlined"
                    multiline
                    rows={5}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                    mt: 2,
                    backgroundColor: "#2596BE",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#1c7da0" },
                    }}
                    onClick={handleFormSubmit}
                >
                    Submit Review
                </Button>
                </Stack>
            </Paper>
        </Box>
    </>
  );
};

export default AddGameReviewPage;
