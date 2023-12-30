import { Outlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Navbar from "../Navbar";

export const Layout = () => {
  return (
    <>
      <CssBaseline /> {/* so this basically make all the padding marging 0 */}
      <Navbar />
      <Outlet />
    </>
  );
};
export default Layout;
