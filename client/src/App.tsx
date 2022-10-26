import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./components/Header";
import { useAppDispatch } from "./hooks";
import { setUser } from "./redux/features/authSlice";

const App = () => {
  const dispatch = useAppDispatch();
  // check if user in local storage using profile key stipulated in authSlice
  // ...or empty object to satisfy typescript
  const user = JSON.parse(localStorage.getItem("profile") || "{}");

  // on each render, dispatch user found
  useEffect(() => {
    dispatch(setUser(user))
  }, [])
  
  return (
    <Router>
      <div className="App">
        <Header />
        <ToastContainer autoClose={1000} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
