import React from "react";
import { TextField, Button, Alert, Box, Grid } from "@mui/material";
import { useState } from "react";

const ResetPassword = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      password: data.get("password"),
      Cpassword: data.get("Cpassword"),
    };
    if (actualData.password && actualData.Cpassword) {
      document.getElementById("reset-password-form").reset();
      if (actualData.password === actualData.Cpassword) {
        setError({
          status: true,
          msg: "password reset successfully",
          type: "success",
        });
      } else {
        setError({
          status: true,
          msg: "password and confirm password donot match",
          type: "error",
        });
      }
    } else {
      setError({ status: true, msg: "All field required", type: "error" });
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
            id="reset-password-form"
          >
            <TextField
              required
              fullWidth
              margin="normal"
              id="password"
              name="password"
              label="Password"
              type="password"
            ></TextField>
            <TextField
              required
              fullWidth
              margin="normal"
              id="Cpassword"
              name="Cpassword"
              label="Confirm Password"
              type="password"
            ></TextField>
            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, px: 5 }}
              >
                Set New Password
              </Button>
            </Box>
          </Box>
          {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
        </Grid>
      </Grid>
    </>
  );
};

export default ResetPassword;
