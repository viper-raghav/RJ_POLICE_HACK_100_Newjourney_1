import React from "react";
import { TextField, Button, Box, Alert, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const Review = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      date: data.get("date"),
      location: data.get("location"),
      experience: data.get("experience"),
      comments: data.get("comments"),
    };
    if (
      actualData.date &&
      actualData.location &&
      actualData.experience &&
      actualData.comments
    ) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/user/review",
          {
            date: actualData.date,
            location: actualData.location,
            experience: actualData.experience,
            comments: actualData.comments,
          }
        );
        let { data } = response;
        if (data.status === "success") {
          console.log(data);
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (data.status === "error") {
      setError({ status: true, msg: "All field required", type: "error" });
    }
  };
  return (
    <>
      <Box
        component="form"
        noValidate
        sx={{
          mt: 1,
          mx: "auto",
          maxWidth: 400,
          border: "1px solid #ccc",
          padding: 2,
          borderRadius: 4,
          height: 520,
        }}
        onSubmit={handleSubmit}
        id="review-form"
      >
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          REVIEW
        </Typography>
        <TextField
          required
          fullWidth
          margin="normal"
          id="date"
          name="date"
          label="date"
        ></TextField>
        <TextField
          required
          fullWidth
          margin="normal"
          id="location"
          name="location"
          label="location"
        ></TextField>
        <TextField
          required
          fullWidth
          margin="normal"
          id="experience"
          name="experience"
          label="experience"
        ></TextField>
        <TextField
          required
          fullWidth
          margin="normal"
          id="comments"
          name="comments"
          label="comments"
        ></TextField>

        <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 1, mb: 2, px: 5 }}
          >
            SUBMIT
          </Button>
        </Box>
      </Box>
      {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
    </>
  );
};

export default Review;
