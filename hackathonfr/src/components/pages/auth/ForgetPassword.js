import { TextField, Button, Alert, Box, Grid } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const ForgetPassword = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get("email"),
    };
    if (actualData.email) {
      document.getElementById("password-reset-form").reset();
      setError({
        status: true,
        msg: "Reset link send to your email",
        type: "success",
      });
      const response = await axios.post(
        "http://localhost:8000/api/user/forgetPassword",
        {
          email: actualData.email,
        }
      );
      const { data } = response;
      if (data.status === "error") {
        setError({ status: true, msg: "email donot exist", type: "error" });
      }
    }
  };
  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid item sm={6} xs={12}>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
            id="password-reset-form"
          >
            <TextField
              required
              fullWidth
              margin="normal"
              id="email"
              name="email"
              label="Email Address"
            ></TextField>
            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, px: 5 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
    </>
  );
};

export default ForgetPassword;
