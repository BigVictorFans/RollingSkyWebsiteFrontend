import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import Navbar from "../../components/appbar";
import BackButton from "../../components/backbutton";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { addUpdateLog } from "../../utils/api_updatelogs"; // your API call function
import { useNavigate } from "react-router-dom";

const AddUpdateLog = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { token = "" } = currentuser;

  const [version, setVersion] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  const handleFormSubmit = async () => {
    if (!version || !content || !date) {
      toast.error("Please fill up the required fields");
      return;
    }

    try {
      await addUpdateLog(version, content, date, token);
      toast.success("Update log added successfully");
      navigate("/updatelogs"); // navigate to the update log list page
    } catch (err) {
      toast.error("Failed to add update log: " + err.message);
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
            Add Update Log
          </Typography>

          <TextField
            label="Version"
            fullWidth
            margin="normal"
            variant="outlined"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
          />

          <TextField
            label="Content"
            fullWidth
            margin="normal"
            multiline
            rows={5}
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <TextField
            label="Select Date"
            type="date"
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <Box textAlign="center" mt={3}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#2596BE",
                "&:hover": { backgroundColor: "#1d7ba0" },
              }}
              onClick={handleFormSubmit}
            >
              Add Update Log
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default AddUpdateLog;
