import React from "react";
import { Box, TextField, Typography, Button, Paper } from "@mui/material";
import Navbar from "../../components/appbar";
import BackButton from "../../components/backbutton";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { addLevel } from "../../utils/api_levels"; 
import { toast } from "sonner";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadImage } from "../../utils/api_image";
import { API_URL } from "../../utils/constants"; // adjust the import path as necessary
import { useNavigate } from "react-router-dom";



const AddLevel = () => {
    const navigate = useNavigate();
    const [cookies] = useCookies(["currentuser"]);
    const { currentuser = {} } = cookies; // assign empty object to avoid error if user not logged in
    const { token = "" } = currentuser;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [baseDifficulty, setBaseDifficulty] = useState("");
    const [perfectDifficulty, setPerfectDifficulty] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [levelThumbnail, setLevelThumbnail] = useState(null);

    const VisuallyHiddenInput = styled("input")({
      clip: "rect(0 0 0 0)",
      clipPath: "inset(50%)",
      height: 1,
      overflow: "hidden",
      position: "absolute",
      bottom: 0,
      left: 0,
      whiteSpace: "nowrap",
      width: 1,
    });


    const handleFormSubmit = async (event) => {
    // 1. check for error
    if (!title || !description || !baseDifficulty || !perfectDifficulty || !releaseDate || !levelThumbnail) {
      toast.error("Please fill up the required fields");
    }

    try {
      // 2. trigger the API to create new level
      await addLevel(title, description, baseDifficulty, perfectDifficulty, releaseDate, levelThumbnail, token);

      // 3. if successful, redirect user back to home page and show success message
      toast.success("New level has been added");
      navigate("/admin");
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
          backgroundColor: "#2596BE",
          minHeight: "100vh",
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
            maxWidth: 600,
            borderRadius: 3,
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
            Add New Level
          </Typography>

          <TextField
            label="Title"
            fullWidth
            margin="normal"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
                fullWidth
                type="number"
                label="Base Difficulty"
                name="fanDifficultyBase"
                value={baseDifficulty}
                onChange={(e) => {
                    let value = parseFloat(e.target.value);
                    if (isNaN(value)) value = "";
                    // clamp the value between 1 and 8
                    else if (value < 1) value = 1;
                    else if (value > 8) value = 8;
                    // round to 1 decimal place
                    else value = Math.round(value * 10) / 10;
                    setBaseDifficulty(value);
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
                name="fanDifficultyBase"
                value={perfectDifficulty}
                onChange={(e) => {
                    let value = parseFloat(e.target.value);
                    if (isNaN(value)) value = "";
                    // clamp the value between 1 and 8
                    else if (value < 1) value = 1;
                    else if (value > 8) value = 8;
                    // round to 1 decimal place
                    else value = Math.round(value * 10) / 10;
                    setPerfectDifficulty(value);
                }}
                inputProps={{
                    step: 0.1, // allows decimal increments of 0.1
                    min: 1,
                    max: 8,
                }}
                sx={{ mb: 2 }}
            />


            {/* try to make it accept dates only */}
            <TextField
              label="Select Date"
              type="date"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true, // ensures the label doesn't overlap with the date
              }}
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
            />

            {/* upload image */}
            <Box mb={2} sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {levelThumbnail ? (
                <>
                  <img src={API_URL + levelThumbnail} width="200px" alt="Uploaded" />
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={() => setLevelThumbnail(null)}
                  >
                    Remove
                  </Button>
                </>
              ) : (
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload image
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={async (event) => {
                      const file = event.target.files[0];
                      if (!file) return;
                      try {
                        const data = await uploadImage(file);
                        setLevelThumbnail(data.image_url);
                      } catch (err) {
                        toast.error("Failed to upload image!");
                      }
                    }}
                  />
                </Button>
              )}
            </Box>
            <Box textAlign="center" mt={3}>
              <Button
                variant="contained"
               sx={{
                 backgroundColor: "#2596BE",
                  "&:hover": { backgroundColor: "#1d7ba0" },
                }}
                onClick={handleFormSubmit}
             >
              Add Level
              </Button>
            </Box>
        </Paper>
      </Box>
    </>
  );
};

export default AddLevel;
