import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import Signup from "./pages/signup/signup";
import Record from "./pages/record/record";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="login" />} />
        <Route path="login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/record" element={<Record />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;