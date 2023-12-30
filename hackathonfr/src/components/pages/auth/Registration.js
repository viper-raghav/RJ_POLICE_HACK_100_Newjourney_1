import {
  TextField,
  Button,
  Box,
  Alert,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Registration = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      Cpassword: data.get("Cpassword"),
      tc: data.get("tc"),
    };
    if (
      actualData.name &&
      actualData.email &&
      actualData.password &&
      actualData.Cpassword &&
      actualData.tc !== null
    ) {
      if (actualData.password === actualData.Cpassword) {
        document.getElementById("registration-form").reset();
        setError({
          status: true,
          msg: "Registration Success",
          type: "success",
        });
        const n = () => {
          navigate("/login");
        };
        try {
          const response = await axios.post(
            "http://localhost:8000/api/user/register",
            {
              name: actualData.name,
              email: actualData.email,
              password: actualData.password,
              confirmPassword: actualData.Cpassword,
              tc: actualData.tc,
            }
          );
          let { data } = response;
          localStorage.setItem("token", data.token);
          setTimeout(n, 1000);
        } catch (err) {
          console.log(err);
        }
      } else {
        setError({
          status: true,
          msg: "password and Confirm passowrd do not match",
          type: "error",
        });
      }
    } else {
      setError({ status: true, msg: "All field required", type: "error" });
    }
  };
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      console.log("Checkbox is checked. Confirmation received!");
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
        id="registration-form"
      >
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          REGISTRATION
        </Typography>
        <TextField
          required
          fullWidth
          margin="normal"
          id="name"
          name="name"
          label="name"
        ></TextField>
        <TextField
          required
          fullWidth
          margin="normal"
          id="email"
          name="email"
          label="Email Address"
        ></TextField>
        <TextField
          required
          fullWidth
          margin="normal"
          id="password"
          name="password"
          label="Password"
        ></TextField>
        <TextField
          required
          fullWidth
          margin="normal"
          id="Cpassword"
          name="Cpassword"
          label="Confirm Password"
        ></TextField>
        <FormControlLabel
          control={<Checkbox value={true} color="primary" name="tc" id="tc" />}
          label="I agree term and condition "
        />
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              name="tc"
              id="tc"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          }
          label="Opt in for notification"
        />
        <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 1, mb: 2, px: 5 }}
          >
            Register
          </Button>
        </Box>
      </Box>
      {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
    </>
  );
};
export default Registration;
