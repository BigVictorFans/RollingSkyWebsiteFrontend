import React from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import Navbar from "../../components/appbar";
import BackButton from "../../components/backbutton";


const EditPostPage = () => {
  return (
    <>
        <Navbar />
      <BackButton />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#2596BE",
          p: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={5}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 600,
            borderRadius: 3,
            bgcolor: "white",
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Edit Post
          </Typography>

          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Content"
            variant="outlined"
            multiline
            rows={5}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Image URL"
            variant="outlined"
            sx={{ mb: 3 }}
          />

          <Button variant="contained" color="warning" fullWidth>
            Save Changes
          </Button>
        </Paper>
      </Box>
    </>
  );
};

export default EditPostPage;
