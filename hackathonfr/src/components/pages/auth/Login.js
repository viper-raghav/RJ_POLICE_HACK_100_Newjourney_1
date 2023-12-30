import { TextField, Button, Alert, Box, Typography } from "@mui/material";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    if (actualData.email && actualData.password) {
      document.getElementById("login-form").reset();
      const n = () => {
        navigate("/home");
      };
      try {
        const response = await axios.post(
          "http://localhost:8000/api/user/login",
          {
            email: actualData.email,
            password: actualData.password,
          }
        );

        let { data } = response;
        if (data.status === "success") {
          localStorage.setItem("token", data.token);
          setTimeout(n, 1000);
        }
        if (data.status === "error") {
          setError({ status: true, msg: "Wrong Credentials", type: "error" });
        }
      } catch (err) {
        setError({ status: true, msg: "Login failed", type: "error" });
      }
    } else {
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
          height: 450,
        }}
        onSubmit={handleSubmit}
        id="login-form"
      >
        <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
          LOGIN
        </Typography>
        <TextField
          required
          fullWidth
          margin="normal"
          id="email"
          name="email"
          label="Email Address"
          sx={{
            mx: "auto",
            mt: 0,
            mb: 1,
            textAlign: "center",
            display: "block",
            margin: "8px auto",
          }}
        ></TextField>
        <TextField
          required
          fullWidth
          margin="normal"
          id="password"
          name="password"
          label="Password"
          sx={{
            mx: "auto",
            mt: 0,
            mb: 1,
            textAlign: "center",
            display: "block",
            margin: "8px auto",
          }}
        ></TextField>
        <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, px: 5 }}
          >
            Login
          </Button>
        </Box>
        <Typography variant="body2" sx={{ alignSelf: "flex-start" }}>
          <NavLink to="/forgetPassword">Forget Password?</NavLink>
        </Typography>
        <Typography variant="body2" sx={{ alignSelf: "flex-end" }}>
          <NavLink to="/registration">New Registration?</NavLink>
        </Typography>
      </Box>

      {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
    </>
  );
};

export default Login;
