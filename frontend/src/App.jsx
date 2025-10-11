
// import { Routes, Route, Navigate } from "react-router-dom";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import HomePage from "./pages/HomePage";
// import DashboardPage from "./pages/DashboardPage";

// export default function App() {
//   const token = localStorage.getItem("token");

//   return (
//     <Routes>
//       <Route path="/" element={token ? <HomePage /> : <Navigate to="/Home" />} />
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/signup" element={<SignupPage />} />
//       <Route path="/login" element={!token ? <LoginPage /> : <Navigate to="/dashboard" />} />
//       <Route path="/dashboard" element={token ? <DashboardPage /> : <Navigate to="/login" />} />
      

//     </Routes>
//   );
// }


import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* ✅ Show HomePage by default */}
      <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
       <Route path="/login" element={!token ? <LoginPage /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={token ? <DashboardPage /> : <Navigate to="/login" />} />
      

   </Routes>
  );
}