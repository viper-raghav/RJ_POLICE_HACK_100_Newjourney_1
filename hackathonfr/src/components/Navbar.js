import { AppBar, Toolbar, Box, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography varient="h5" component="div" sx={{ flexGrow: 1 }}>
              Police Review System
            </Typography>
            <Button
              component={NavLink}
              sx={{ color: "white" }}
              style={({ isActive }) => {
                return { backgroundColor: isActive ? "black" : "" };
              }}
              to="/home/review"
            >
              Review
            </Button>
            <Button
              component={NavLink}
              sx={{ color: "white" }}
              style={({ isActive }) => {
                return { backgroundColor: isActive ? "black" : "" };
              }}
              to="/home/community"
            >
              COMMUNITY
            </Button>
            <Button
              component={NavLink}
              sx={{ color: "white" }}
              style={({ isActive }) => {
                return { backgroundColor: isActive ? "black" : "" };
              }}
              to="/home/profile"
            >
              PROFILE
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
