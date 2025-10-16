import React from "react";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Divider,
  Stack,
  Button
} from "@mui/material";
import Navbar from "../../components/appbar";
import BackButton from "../../components/backbutton";
import { getUpdateLogs } from "../../utils/api_updatelogs";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { deleteUpdateLog } from "../../utils/api_updatelogs";
import Swal from "sweetalert2";
import { Refresh } from "@mui/icons-material";




const UpdateLogPage = () => {

    const navigate = useNavigate();
    const [cookies] = useCookies(["currentupdatelog"]);
    const { currentupdatelog = {} } = cookies; // assign empty object to avoid error if updatelog not logged in
    const { token = "" } = currentupdatelog;
    // to store the data from /levels
    const [updates, setUpdates] = useState([]);

  
    useEffect(() => {
      getUpdateLogs().then((data) => {
        setUpdates(data);
        console.log(data);
      });
    }, []);

    const handleUpdateDelete= async (id) => {
          Swal.fire({
              title: "Are you sure you want to delete this updatelog?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            }).then(async (result) => {
              // once updatelog confirm, then we delete the updatelog
              if (result.isConfirmed) {
                // delete updatelog at the backend
                await deleteUpdateLog(id, token);
    
                // method #1: remove from the state manually
                // delete updatelog from the state
                // setupdatelogs(updatelogs.filter((p) => p._id !== id));
    
                // method #2: get the new data from the backend
                const updatedUpdatelogs = await getUpdateLogs();
                setUpdates(updatedUpdatelogs);
    
                toast.success("updatelog has been deleted");
                navigate("/updatelogs");
                Refresh 
              }
            });
          };

  return (
    <>
      <Navbar />
      <BackButton />
      <Box
        sx={{
          bgcolor: "#2596BE",
          minHeight: "100vh",
          p: { xs: 2, md: 4 },
          color: "white",
        }}
      >
      <Stack
                direction="row"
                alignItems="center"
                sx={{
                  display:"flex",
                  justifyContent:"space-around",
                  width: "100%",
                  maxWidth: 700,
                  mx: "auto",
                  mb:"3"
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
                      mb: 4,
                    }}
                  >
                    Update Log
                </Typography>
                <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                    backgroundColor: "white",
                    color: "#2596BE",
                    fontWeight: "bold",
                    "&:hover": {
                    backgroundColor: "#e3f2fd",
                    },
                }}
                onClick={() => navigate("/updatelogs/add")}
                >
                Add Update
                </Button>
      </Stack>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {updates.map((update) => (
            <Card
              key={update._id}
              sx={{
                backgroundColor: "rgba(255,255,255,0.95)",
                color: "#1a1a1a",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            >
              <CardContent>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "gray", mb: 1 }}
                >
                  {new Date(update.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                  })}
                </Typography>
                <Box sx={{display:"flex", justifyContent:"end"}} >
                  <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleUpdateDelete(update._id)}
                      sx={{alignSelf:"end"}}
                  >
                      Delete
                  </Button>
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "#2596BE", mb: 1 }}
                >
                  {update.version}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2">{update.content}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default UpdateLogPage;
