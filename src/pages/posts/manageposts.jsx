import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/appbar";
import BackButton from "../../components/backbutton";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { getPosts, deletePost } from "../../utils/api_post";

const ManagePosts = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { token = "", _id: currentUserId = "" } = currentuser;

  const [posts, setPosts] = useState([]);

  // Fetch and filter posts
  useEffect(() => {
    fetchUserPosts();
  }, []);

const fetchUserPosts = async () => {
  try {
    const data = await getPosts("all", "newest", ""); // get all posts from backend
    let userPosts = [];

    // If user is NOT admin → show only their posts
    if (currentuser.role !== "admin") {
      userPosts = data.filter((post) => post.userId?._id === currentUserId);
    } 
    // If admin → show all posts
    else {
      userPosts = data;
    }

    setPosts(userPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    toast.error("Failed to load posts");
  }
};


  // Handle deleting a post
  const handlePostDelete = async (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this post?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deletePost(id, token);
          // Remove deleted post from local state without re-fetching everything
          setPosts(posts.filter((p) => p._id !== id));
          toast.success("Post has been deleted");
        } catch (error) {
          console.error("Error deleting post:", error);
          toast.error("Failed to delete post");
        }
      }
    });
  };

  return (
    <>
      <Navbar />
      <BackButton />

      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#2596BE",
          py: 5,
          px: { xs: 2, md: 8 },
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          color="#f4f9fc"
          mb={3}
          textAlign="center"
        >
          Manage My Posts
        </Typography>

        <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
          {posts.length === 0 ? (
            <Typography
              variant="h6"
              textAlign="center"
              color="text.secondary"
              sx={{ py: 4 }}
            >
              You haven’t created any posts yet.
            </Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#2596BE" }}>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Title
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Category
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Date
                    </TableCell>
                    <TableCell
                      sx={{ color: "white", fontWeight: "bold" }}
                      align="center"
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post._id} hover>
                      <TableCell>{post.title}</TableCell>
                      <TableCell>{post.category.label || "all"}</TableCell>
                      <TableCell>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="center">
                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="center"
                        >
                          
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{
                              color: "#2596BE",
                              borderColor: "#2596BE",
                              "&:hover": {
                                borderColor: "#1d7ba0",
                                backgroundColor: "#e3f3f9",
                              },
                            }}
                            onClick={() =>
                              navigate(`/posts/${post._id}`)
                            }
                          >
                            View
                          </Button>

                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handlePostDelete(post._id)}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Box>
    </>
  );
};

export default ManagePosts;
