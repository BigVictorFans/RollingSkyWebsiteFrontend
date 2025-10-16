import React, { use } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import Navbar from "../../components/appbar";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/backbutton";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { getLevels } from "../../utils/api_levels";
import { API_URL } from "../../utils/constants"; // adjust the import path as necessary
import Swal from "sweetalert2";
import { toast } from "sonner";
import { deleteLevel } from "../../utils/api_levels";




const ManageLevelsPage = () => {
    const [cookies] = useCookies(["currentuser"]);
    const { currentuser = {} } = cookies; // assign empty object to avoid error if user not logged in
    const { token = "" } = currentuser;
    // to store the data from /levels
    const [levels, setLevels] = useState([]);
  
    useEffect(() => {
      getLevels().then((data) => {
        setLevels(data);
        console.log();
      });
    }, []);

  const navigate = useNavigate();

  const handlelevelDelete = async (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this level?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      // once user confirm, then we delete the level
      if (result.isConfirmed) {
        // delete level at the backend
        await deleteLevel(id, token);

        // method #1: remove from the state manually
        // delete level from the state
        // setlevels(levels.filter((p) => p._id !== id));

        // method #2: get the new data from the backend
        const updatedlevels = await getLevels();
        setLevels(updatedlevels);

        toast.success("Level has been deleted");
        navigate("/admin/managelevels");
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
          p: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Manage Levels
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "#2596BE",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#e0f4fa" },
            }}
            onClick={() => navigate("/levels/add")}
          >
            + Add New Level
          </Button>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1e7ca0" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Title
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Description
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Base Difficulty
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Perfect Difficulty
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Level Thumbnail
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Release Date
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {levels.map((level) => (
                <TableRow key={level._id}>
                  <TableCell>{level.title}</TableCell>
                  <TableCell>{level.description}</TableCell>
                  <TableCell>{level.baseDifficulty}</TableCell>
                  <TableCell>{level.perfectDifficulty}</TableCell>
                  <TableCell>
                    {level.levelThumbnail ? (
                      <img 
                        src={API_URL + level.levelThumbnail} 
                        alt={level.title || "Level Thumbnail"} 
                        style={{ width: "100px", height: "auto", objectFit: "cover" }} 
                      />
                    ) : (
                      "No Image"
                    )}
                  </TableCell>
                  <TableCell>
                    {level.releaseDate 
                      ? new Date(level.releaseDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "No Date"}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          color: "#2596BE",
                          borderColor: "#2596BE",
                          "&:hover": {
                            backgroundColor: "#e0f4fa",
                            borderColor: "#2596BE",
                          },
                        }}
                        onClick={() => navigate(`/levels/${level._id}`)} 
                      >
                        View
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: "#2596BE",
                          "&:hover": { backgroundColor: "#1e7ca0" },
                        }}
                         onClick={() => navigate(`/levels/edit/${level._id}`)} 
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        sx={{
                          "&:hover": { backgroundColor: "#fde0e0" },
                        }}
                        onClick={() => handlelevelDelete(level._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default ManageLevelsPage;
