import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import Navbar from "../../components/appbar";
import BackButton from "../../components/backbutton";
import { useParams } from "react-router-dom";
import {
    addReview,
  getReviewsByLevel,
} from "../../utils/api_levelreviews"; // adjust import names if needed
import { useCookies } from "react-cookie";
import { toast } from "sonner";


const LevelReviewsPage = () => {
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies; // assign empty object to avoid error if user not logged in
  const { token = "" } = currentuser;
  const { id } = useParams(); // level ID from URL
  const [levelId, setLevelId] = useState(id);
  const [reviews, setReviews] = useState([]);
  const [content, setContent] = useState("");
  const [fanDifficultyBase, setFanDifficultyBase] = useState("");
  const [fanDifficultyPerfect, setFanDifficultyPerfect] = useState("");

  // Load reviews for this level
  useEffect(() => {
    loadReviews();
  }, [id]);


  const loadReviews = async () => {
    try {
      const data = await getReviewsByLevel(id);
      setReviews(data);
    } catch (err) {
      console.error("Error loading reviews:", err);
    }
  };

  const handleFormSubmit = async (event) => {
    // 1. check for error
    if (!content || !fanDifficultyBase || !fanDifficultyPerfect) {
      toast.error("Please fill up the required fields");
    }

    try {
      // 2. trigger the API to create new level
      await addReview(levelId, content, fanDifficultyBase, fanDifficultyPerfect, token);

      // 3. if successful, redirect user back to home page and show success message
      toast.success("New level has been added");
      navigate("/");
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
          bgcolor: "#2596BE",
          p: { xs: 2, md: 4 },
        }}
      >
        <Paper
          elevation={5}
          sx={{
            p: 3,
            borderRadius: 3,
            bgcolor: "white",
            color: "#1a1a1a",
            maxWidth: 900,
            mx: "auto",
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: "#2596BE", fontWeight: 700, mb: 3 }}
          >
            Level Reviews
          </Typography>

          {/* 🧩 Add Review Form */}
          <Box component="form"  sx={{ my: 4 }}>
            <Typography
              variant="h6"
              sx={{ color: "#2596BE", fontWeight: 700, mb: 2 }}
            >
              Add Your Review
            </Typography>
            <TextField
                fullWidth
                type="number"
                label="Base Difficulty"
                name="fanDifficultyBase"
                value={fanDifficultyBase}
                onChange={(e) => {
                    let value = parseFloat(e.target.value);
                    if (isNaN(value)) value = "";
                    // clamp the value between 1 and 8
                    else if (value < 1) value = 1;
                    else if (value > 8) value = 8;
                    // round to 1 decimal place
                    else value = Math.round(value * 10) / 10;
                    setFanDifficultyBase(value);
                }}
                inputProps={{
                    step: 0.1, // allows decimal increments of 0.1
                    min: 1,
                    max: 8,
                }}
                sx={{ mb: 2 }}
            />

                <TextField
                fullWidth
                type="number"
                label="Perfect Difficulty"
                name="fanDifficultyPerfect"
                value={fanDifficultyPerfect}
                onChange={(e) => {
                    let value = parseFloat(e.target.value);
                    if (isNaN(value)) value = "";
                    else if (value < 1) value = 1;
                    else if (value > 8) value = 8;
                    else value = Math.round(value * 10) / 10;
                    setFanDifficultyPerfect(value);
                }}
                inputProps={{
                    step: 0.1,
                    min: 1,
                    max: 8,
                }}
                sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Write your review"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="warning"
              fullWidth
              sx={{ fontWeight: "bold", textTransform: "none" }}
              onClick={handleFormSubmit}
            >
              Submit Review
            </Button>
          </Box>

          {/* 🧩 Review List */}
          {reviews.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No reviews yet. Be the first to write one!
            </Typography>
          ) : (
            reviews.map((review) => (
              <Box key={review._id || review.id} sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, color: "#2596BE" }}
                >
                  {review.userId.name || "Anonymous"}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {review.content}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Base: {review.fanDifficultyBase} | Perfect:{" "}
                  {review.fanDifficultyPerfect}
                </Typography>
                <Divider sx={{ mt: 2 }} />
              </Box>
            ))
          )}
        </Paper>
      </Box>
    </>
  );
};

export default LevelReviewsPage;
