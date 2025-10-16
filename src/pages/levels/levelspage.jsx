import React from "react";
import { Tab, Tabs } from "@mui/material";
import { TabContext, TabList, TabPanel } from '@mui/lab';
import BackButton from "../../components/backbutton"
import { useCookies } from "react-cookie";



import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/appbar";
import { useState, useEffect } from "react";
import { getLevels } from "../../utils/api_levels";
import { API_URL } from "../../utils/constants"; // adjust the import path as necessary

const LevelsMainPage = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies; // assign empty object to avoid error if user not logged in
  const { token = "" } = currentuser;
  // to store the data from /levels
  const [levels, setLevels] = useState([]);
  const [tabValue, setTabValue] = React.useState("veryeasy");
  const [difficulty, setDifficulty] = React.useState(tabValue || "veryeasy");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setDifficulty(newValue);
  };

  useEffect(() => {
    getLevels(difficulty).then((data) => {
      setLevels(data);
      console.log(difficulty);
    });
  }, [difficulty]);

  return (
    <>
      <Navbar />
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: "center",  }}>
          <TabList onChange={handleTabChange} sx={{ mx: "auto" }}>
            <Tab label="1 Star" value="veryeasy" />
            <Tab label="2 Stars" value="easy" />
            <Tab label="3 Stars" value="normal" />
            <Tab label="4 Stars" value="hard" />
            <Tab label="5 Stars" value="veryhard" />
            <Tab label="6 Stars" value="extreme" />
          </TabList>
        </Box>
      </TabContext>
      <BackButton />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#2596BE",
          p: { xs: 2, md: 4 },
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "white", fontWeight: "bold", mb: 4 }}
        >
          Levels
        </Typography>

        <Grid container spacing={3}>
          {levels.map((level) => (
            <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={level._id}>
              <Card
                sx={{
                  bgcolor: "white",
                  borderRadius: 3,
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {level.levelThumbnail && (
                  <CardMedia
                    component="img"
                    height="400px"
                    image={ API_URL + level.levelThumbnail }
                    alt={level.title}
                    sx={{ objectFit: "cover" }}
                  />
                )}
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ color: "#2596BE", fontWeight: 700 }}
                  >
                    {level.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Base Difficulty: {level.baseDifficulty}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Perfect Difficulty: {level.perfectDifficulty}
                  </Typography>
                  <Typography variant="caption" color="gray">
                    Released: {new Date(level.releaseDate).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                  </Typography>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 2,
                      backgroundColor: "#2596BE",
                      "&:hover": { backgroundColor: "#1f7fa3" },
                    }}
                    onClick={() => navigate(`/levels/${level._id}`)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default LevelsMainPage;
