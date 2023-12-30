import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/auth/Login";
import ForgetPassword from "./components/pages/auth/ForgetPassword";
import ResetPassword from "./components/pages/auth/ResetPassword";
import Registration from "./components/pages/auth/Registration";
import Review from "./components/pages/Review";
import Community from "./components/pages/Community";
import Profile from "./components/pages/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="api/user/reset/:id/:token" element={<ResetPassword />} />
          <Route path="/home" element={<Home />}>
            <Route path="community" element={<Community />} />
            <Route path="profile" element={<Profile />} />
            <Route path="review" element={<Review />} />
          </Route>
          <Route path="*" element={<h1>404 page not found</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
