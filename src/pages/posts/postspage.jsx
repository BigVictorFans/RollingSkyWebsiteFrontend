import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Modal,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField, // ✅ added for search
} from "@mui/material"; // ✅ updated import
import Navbar from "../../components/appbar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { getCategories } from "../../utils/api_postcategories";
import { getPosts } from "../../utils/api_post";
import { API_URL } from "../../utils/constants";

export default function PostsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "newest");
  const [posts, setPosts] = useState([]); 
  const [openImage, setOpenImage] = useState(null);

  const [search, setSearch] = useState(searchParams.get("search") || ""); // ✅ added search state

  // ✅ Update URL to include search param
  const updateURL = (newCategory, newSortBy, newSearch) => {
    const params = {};
    if (newCategory && newCategory !== "all") params.category = newCategory;
    if (newSortBy) params.sortBy = newSortBy;
    if (newSearch && newSearch.trim() !== "") params.search = newSearch; // ✅ added
    setSearchParams(params);
  };

  const handleCategoryFilter = (event) => {
    const value = event.target.value;
    setCategory(value);
    updateURL(value, sortBy, search); // ✅ include search in updateURL
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortBy(value);
    updateURL(category, value, search); // ✅ include search in updateURL
  };

  // ✅ handle search input
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    updateURL(category, sortBy, value); // ✅ keep URL synced
  };

  // Fetch posts
  useEffect(() => {
    getPosts(category, sortBy, search) // ✅ include search param
      .then((data) => {
        console.log("Posts fetched in component:", data);
        setPosts(data || []);
      })
      .catch((err) => {
        toast.error("Failed to fetch posts");
        console.error(err);
        setPosts([]);
      });
  }, [category, sortBy, search]); // ✅ added search dependency

  // Fetch categories
  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data || []))
      .catch((err) => console.error(err));
  }, []);

  const handleOpenImage = (src) => src && setOpenImage(src);
  const handleCloseImage = () => setOpenImage(null);

  return (
    <>
      <Navbar />
      <Box sx={{ backgroundColor: "#2596BE", minHeight: "100vh", p: 4, color: "white" }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, textShadow: "1px 1px 3px rgba(0,0,0,0.3)" }}>
              Posts
            </Typography>

            {/* ✅ Search Field */}
            <TextField
              label="Search by title"
              variant="outlined"
              size="small"
              value={search}
              onChange={handleSearchChange}
              sx={{
                backgroundColor: "white",
                borderRadius: 1,
                width: 250,
              }}
            />

            {/* Category Filter */}
            <FormControl sx={{ minWidth: 120, backgroundColor: "white", borderRadius: 1, width: 200 }}>
              <InputLabel>Filter Categories</InputLabel>
              <Select value={category} label="Filter By" onChange={handleCategoryFilter}>
                <MenuItem value="all">All</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Sort By */}
            <FormControl sx={{ minWidth: 120, backgroundColor: "white", borderRadius: 1, width: 200 }}>
              <InputLabel>Sort By</InputLabel>
              <Select value={sortBy} label="Sort By" onChange={handleSortChange}>
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="oldest">Oldest</MenuItem>
                <MenuItem value="popular">Popular</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Button
            variant="contained"
            sx={{ backgroundColor: "white", color: "#2596BE", fontWeight: 600 }}
            onClick={() => navigate("/posts/add")}
          >
            Create Post
          </Button>
        </Box>

        {/* Posts List */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {posts.length === 0 && <Typography>No posts found.</Typography>}
          {posts.map((post) => (
            <Card key={post._id} sx={{ backgroundColor: "white", color: "#000", borderRadius: 2 }}>
              {post.attachments && (
                <CardMedia
                  component="img"
                  height="400"
                  image={API_URL + post.attachments}
                  alt={post.title}
                  onClick={() => handleOpenImage(API_URL + post.attachments)}
                  sx={{ cursor: "pointer", objectFit: "cover" }}
                />
              )}
              <CardContent>
                <Typography variant="h6" sx={{ color: "#2596BE" }}>
                  {post.title}
                </Typography>
                <Typography variant="body2">{post.content}</Typography>
                <Typography variant="caption">By {post.userId?.name || "Unknown"}</Typography>

                <Stack direction="row" justifyContent="flex-end" mt={1}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => navigate(`/posts/${post._id}`)}
                  >
                    View
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Image Modal */}
        <Modal
          open={!!openImage}
          onClose={handleCloseImage}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.85)",
          }}
        >
          <Box sx={{ maxWidth: "90%", maxHeight: "90%" }} onClick={handleCloseImage}>
            {openImage && (
              <img
                src={openImage}
                alt="Expanded"
                style={{ width: "100%", height: "auto", borderRadius: 8 }}
              />
            )}
          </Box>
        </Modal>
      </Box>
    </>
  );
}
