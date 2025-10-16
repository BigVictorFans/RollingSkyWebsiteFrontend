import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CardMedia,
  Button,
} from "@mui/material";
import Navbar from "../../components/appbar";
import BackButton from "../../components/backbutton";
import { useParams, useNavigate } from "react-router-dom";
import { getLevel } from "../../utils/api_levels";
import { API_URL } from "../../utils/constants";

const LevelDetailsPage = () => {
  const { id } = useParams();
  const [level, setLevel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getLevel(id).then((data) => setLevel(data));
  }, [id]);

  // 🧩 Guard: prevent rendering before data is loaded
  if (!level) {
    return (
      <>
        <Navbar />
        <BackButton />
        <Box
          sx={{
            minHeight: "100vh",
            bgcolor: "#2596BE",
            p: { xs: 2, md: 4 },
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Loading level details...</Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <BackButton />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#2596BE",
          p: { xs: 2, md: 4 },
          color: "white",
        }}
      >
        <Paper
          elevation={5}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            bgcolor: "white",
            color: "#1a1a1a",
            maxWidth: 900,
            mx: "auto",
          }}
        >
          <CardMedia
            component="img"
            height="1300"
            width="150px"
            image={API_URL + level.levelThumbnail}
            alt={level.title}
            sx={{
              borderRadius: 2,
              mt: 2,
            }}
          />
          <Typography variant="h4" sx={{ color: "#2596BE", fontWeight: 700 }}>
            {level.title}
          </Typography>
          <Typography variant="body1" sx={{ my: 2 }}>
            {level.description}
          </Typography>

          <Typography color="text.secondary">
            Base Difficulty: {level.baseDifficulty}
          </Typography>
          <Typography color="text.secondary">
            Perfect Difficulty: {level.perfectDifficulty}
          </Typography>
          <Typography variant="caption" color="gray">
            Released:{" "}
            {new Date(level.releaseDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>

          {/* 🔸 Load Reviews Button */}
          <Button
            variant="contained"
            color="warning"
            fullWidth
            sx={{
              mt: 3,
              fontWeight: "bold",
              textTransform: "none",
            }}
            onClick={() => navigate(`/levels/${id}/reviews`)}
          >
            Load Reviews
          </Button>
        </Paper>
      </Box>
    </>
  );
};

export default LevelDetailsPage;
