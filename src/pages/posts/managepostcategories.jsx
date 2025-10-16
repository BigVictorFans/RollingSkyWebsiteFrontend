import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Modal,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../utils/api_postcategories";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";
import Navbar from "../../components/appbar";
import BackButton from "../../components/backbutton";

const CategoriesPage = () => {
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies; // assign empty object to avoid error if user not logged in
  const { token = "" } = currentuser;
  const [categories, setCategories] = useState([]);
  const [label, setLabel] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedCatID, setSelectedCatID] = useState("");
  const [selectedCatLabel, setSelectedCatLabel] = useState("");

  // Fetch categories when component loads
  useEffect(() => {
    getCategories().then((data) => setCategories(data));

    // Load token from localStorage if you store it there
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  // Add new category
  const handleAddNew = async () => {
    if (label.trim() === "") {
      toast.error("Please fill up the category label");
      return;
    }

    try {
      await addCategory(label, token);
      const newCategories = await getCategories();
      setCategories(newCategories);
      setLabel("");
      toast.success("New category has been added");
    } catch (error) {
      toast.error("Failed to add category. Make sure you are authorized.");
      console.error(error);
    }
  };

  // Update category
  const handleUpdate = async () => {
    try {
      await updateCategory(selectedCatID, selectedCatLabel, token);
      const newCategories = await getCategories();
      setCategories(newCategories);
      toast.success("Category has been updated");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update category. Make sure you are authorized.");
      console.error(error);
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this category?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCategory(id, token);
          const newCategories = await getCategories();
          setCategories(newCategories);
          toast.info("Category has been deleted");
        } catch (error) {
          toast.error("Failed to delete category. Make sure you are authorized.");
          console.error(error);
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
                    backgroundColor: "#2196B6",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    py: 4,
                }}
                >
                <Paper
                    elevation={6}
                    sx={{
                    width: "100%",
                    maxWidth: 600,
                    p: 4,
                    borderRadius: 3,
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
                    Manage Categories
                    </Typography>

                    {/* Add New Category Section */}
                    <Box sx={{ mb: 3 }}>
                    <InputLabel sx={{ mb: 1 }}>Add New Category</InputLabel>
                    <TextField
                        fullWidth
                        label="Category"
                        variant="outlined"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                        backgroundColor: "#E66A00",
                        color: "white",
                        "&:hover": { backgroundColor: "#cc5b00" },
                        }}
                        onClick={handleAddNew}
                    >
                        ADD CATEGORY
                    </Button>
                    </Box>

                    {/* Existing Categories */}
                    <InputLabel sx={{ mb: 1 }}>
                    Existing Categories ({categories.length})
                    </InputLabel>
                    <List sx={{ border: "1px solid #eee", borderRadius: 2 }}>
                    {categories.map((category) => (
                        <ListItem
                        key={category._id}
                        divider
                        secondaryAction={
                            <Box sx={{ display: "flex", gap: "5px" }}>
                            <IconButton
                                onClick={() => {
                                setOpen(true);
                                setSelectedCatID(category._id);
                                setSelectedCatLabel(category.label);
                                }}
                            >
                                <Edit />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(category._id)}>
                                <Delete />
                            </IconButton>
                            </Box>
                        }
                        >
                        <ListItemText primary={category.label} />
                        </ListItem>
                    ))}
                    </List>
                </Paper>

                {/* Edit Modal */}
                <Modal open={open} onClose={() => setOpen(false)}>
                    <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                    }}
                    >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Edit Category
                    </Typography>
                    <TextField
                        fullWidth
                        label="Category"
                        variant="outlined"
                        value={selectedCatLabel}
                        onChange={(e) => setSelectedCatLabel(e.target.value)}
                    />
                    <Box
                        sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 2,
                        mt: 3,
                        }}
                    >
                        <Button variant="outlined" onClick={() => setOpen(false)}>
                        Cancel
                        </Button>
                        <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#E66A00",
                            "&:hover": { backgroundColor: "#cc5b00" },
                        }}
                        onClick={handleUpdate}
                        >
                        Update
                        </Button>
                    </Box>
                    </Box>
                </Modal>
            </Box>
    </>
  );
};

export default CategoriesPage;
