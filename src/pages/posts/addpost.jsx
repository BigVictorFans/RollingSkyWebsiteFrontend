import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Navbar from "../../components/appbar";
import BackButton from "../../components/backbutton";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { getCategories } from "../../utils/api_postcategories";
import { addPosts } from "../../utils/api_post";
import { styled } from "@mui/system";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { uploadImage } from "../../utils/api_image";
import { API_URL } from "../../utils/constants"; // adjust the import path as necessary

const AddPostPage = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { token = "" } = currentuser;

  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [attachments, setAttachments] = useState("");
  const [category, setCategory] = useState("");

  // Fetch categories on mount
  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  const handleSubmit = async () => {
    if (!title || !content || !category) {
      toast.error("Please fill in all required fields (title, content, category)");
      return;
    }

    try {
      await addPosts( title, content, category, attachments, token);
      toast.success("New post added successfully!");
      navigate("/posts");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add post");
    }
  };

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
            Add New Post
          </Typography>

          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            sx={{ mb: 2 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            fullWidth
            label="Content"
            variant="outlined"
            multiline
            rows={5}
            sx={{ mb: 2 }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* upload image */}
            <Box mb={2} sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {attachments ? (
                <>
                  <img src={API_URL + attachments} width="200px" alt="Uploaded" />
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={() => setAttachments(null)}
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
                        setAttachments(data.image_url);
                      } catch (err) {
                        toast.error("Failed to upload image!");
                      }
                    }}
                  />
                </Button>
              )}
            </Box>

          <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
            Submit Post
          </Button>
        </Paper>
      </Box>
    </>
  );
};

export default AddPostPage;
