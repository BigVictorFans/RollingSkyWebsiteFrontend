import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Divider,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Navbar from "../../components/appbar";
import BackButton from "../../components/backbutton";
import { useParams } from "react-router-dom";
import { getPost, toggleLikePost } from "../../utils/api_post";
import { API_URL } from "../../utils/constants";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { addComment, getComments } from "../../utils/api_postcomments";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [openImage, setOpenImage] = useState(false);
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { token = "", _id: currentUserId } = currentuser;
  const [comments, setComments] = useState([]);
  const [ postId, setPostId ] = useState(id);
  const [ content, setContent ] = useState("");
  const navigate = useNavigate();

   useEffect(() => {
      loadComments();
    }, [id]);
  
  
    const loadComments = async () => {
      try {
        const data = await getComments(id);
        setComments(data);
      } catch (err) {
        console.error("Error loading reviews:", err);
      }
    };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPost(id);
        setPost(data);
      } catch (error) {
        toast.error("Failed to fetch post");
      }
    };
    fetchPost();
  }, [id]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPost(id);
        setPost(data);
      } catch (error) {
        toast.error("Failed to fetch post");
      }
    };
    fetchPost();
  }, [id]);

  const handleImageClick = () => setOpenImage(true);
  const handleClose = () => setOpenImage(false);

  const handleLikeClick = async () => {
    if (!token) {
      toast.error("You must be logged in to like posts.");
      return;
    }
    try {
      const updatedPost = await toggleLikePost(id, token);
      setPost(updatedPost); // update post state with new likes
    } catch (error) {
      toast.error("Failed to toggle like.");
    }
  };

  if (!post) return <Typography>Loading...</Typography>;

  // Check if current user has liked this post
  const likedByUser = post.likes?.includes(currentUserId);


    const handleAddComment = async (event) => {
      // 1. check for error
      if (!content) {
        toast.error("Please fill up the required fields");
      }
  
      try {
        // 2. trigger the API to create new comment
        await addComment(postId, content, token);
  
        // 3. if successful, redirect user back to home page and show success message
        toast.success("New comment has been added");
        navigate("/posts/" + postId);
        loadComments(); // Refresh comments after adding a new one
      } catch (error) {
        toast.error(error.message);
      }
    };

  return (
    <>
      <Navbar />
      <BackButton />
      <Box sx={{ bgcolor: "#2596BE", minHeight: "100vh", p: 4 }}>
        {/* Post Content */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
          {post.attachments && (
            <>
              <Box
                component="img"
                src={API_URL + post.attachments}
                alt="Post visual"
                onClick={handleImageClick}
                sx={{
                  width: "100%",
                  maxHeight: 550,
                  objectFit: "cover",
                  borderRadius: 2,
                  mt: 2,
                  cursor: "pointer",
                  transition: "transform 0.2s ease",
                  "&:hover": { transform: "scale(1.02)" },
                }}
              />

              <Dialog open={openImage} onClose={handleClose} maxWidth="lg">
                <DialogContent
                  sx={{
                    p: 0,
                    bgcolor: "black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={API_URL + post.attachments}
                    alt="Expanded post visual"
                    sx={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "90vh",
                      objectFit: "contain",
                    }}
                  />
                </DialogContent>
              </Dialog>
            </>
          )}

          <Typography variant="h5" mb={2} sx={{ fontWeight: 700, color: "#2596BE" }}>
            {post.title}
          </Typography>

          <Typography variant="body1" mb={2}>
            {post.content}
          </Typography>

          {/* Like button */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={handleLikeClick}
              color={likedByUser ? "primary" : "default"}
            >
              <ThumbUpIcon />
            </IconButton>
            <Typography>{post.likes?.length || 0} Likes</Typography>
          </Box>
        </Paper>

        {/* Add Comment Box */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Add a Comment
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Write your comment here..."
            variant="outlined"
            sx={{ mb: 2 }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button variant="contained" color="warning" onClick={handleAddComment}>
            Post Comment
          </Button>
        </Paper>

        {/* Comments Section */}
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Comments
          </Typography>

          {/* Example comments */}
          {comments.length === 0 ? (
            <Typography>No comments yet. Be the first to comment!</Typography>
          ) : (
            comments.map((comment) => (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {comment.userId?.name}
                </Typography>
                <Typography variant="body2">
                  {comment.content}
                </Typography>
                <Divider sx={{ my: 1 }} />
              </Box>
            ))
          )}
        </Paper>

      </Box>
    </>
  );
};

export default PostPage;
