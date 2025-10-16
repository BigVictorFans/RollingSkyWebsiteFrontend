import React from "react";
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
  Avatar,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/appbar";
import BackButton from "../../components/backbutton";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { deleteUser } from "../../utils/api_users";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { getUsers } from "../../utils/api_users";
import { API_URL } from "../../utils/constants"; // adjust the import path as necessary




const ManageUsers = () => {

  const [cookies] = useCookies(["currentuser"]);
    const { currentuser = {} } = cookies; // assign empty object to avoid error if user not logged in
    const { token = "" } = currentuser;
    // to store the data from /users
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      getUsers().then((data) => {
        setUsers(data);
        console.log();
      });
    }, []);

  const navigate = useNavigate();

  const handleuserDelete = async (id) => {
      Swal.fire({
          title: "Are you sure you want to delete this user?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
          // once user confirm, then we delete the user
          if (result.isConfirmed) {
            // delete user at the backend
            await deleteUser(id, token);

            // method #1: remove from the state manually
            // delete user from the state
            // setusers(users.filter((p) => p._id !== id));

            // method #2: get the new data from the backend
            const updatedusers = await getUsers();
            setUsers(updatedusers);

            toast.success("user has been deleted");
            navigate("/admin/manageusers");
          }
        });
      };

  return (
    <>
      <Navbar />
      <BackButton/>
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
          Manage Users
        </Typography>

        <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#2596BE" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Username</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Role</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id} hover>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
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
                          onClick={() => navigate(`/manageusers/edit/${user._id}`)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleuserDelete(user._id)}
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
        </Paper>
      </Box>
    </>
  );
};

export default ManageUsers;
