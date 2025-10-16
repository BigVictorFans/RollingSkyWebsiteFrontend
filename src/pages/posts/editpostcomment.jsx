import React from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

const EditCommentPage = () => {
  return (
    <>
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
            Edit Comment
          </Typography>

          <TextField
            fullWidth
            label="Comment"
            variant="outlined"
            multiline
            rows={4}
            sx={{ mb: 3 }}
            placeholder="Edit your comment here..."
          />

          <Button
            variant="contained"
            color="warning"
            fullWidth
            sx={{
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Save Changes
          </Button>
        </Paper>
      </Box>
    </>
  );
};

export default EditCommentPage;
