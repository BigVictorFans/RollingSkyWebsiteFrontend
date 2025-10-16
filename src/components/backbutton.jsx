import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BackButton = () => {
    const goBack = () => {
        navigate(-1);
        
    }
    const navigate = useNavigate();
    return (
        <>
            <Box sx={{ pt:2, px:2, bgcolor: "#2596BE" }}>
                    <Button
                        variant="contained"
                        startIcon={<ArrowBackIcon />}
                        onClick={goBack}
                        sx={{
                          textTransform: "none", // keep "Back" capitalized normally
                          borderRadius: 2, // slightly rounded corners
                          padding: "8px 16px",
                          backgroundColor: "white",
                          color: "#2596BE",
                        }}
                      >
                        Back
                    </Button>
            </Box>
        </>
    )
}

export default BackButton;