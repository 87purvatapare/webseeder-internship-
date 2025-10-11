

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useUserStore } from "../stores/useUserStore";

// const LoginPage = () => {
//   const { login, loading } = useUserStore();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await login({ email: formData.email.trim(), password: formData.password });
//     navigate("/dashboard"); // ✅ redirect after login
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2 style={styles.title}>Login</h2>
//         <form onSubmit={handleSubmit} style={styles.form}>
//           <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={styles.input} required />
//           <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} style={styles.input} required />
//           <button type="submit" style={styles.button} disabled={loading}>
//             {loading ? "Loading..." : "Login"}
//           </button>
//         </form>
//         <p style={styles.text}>
//           Not a member? <Link to="/signup">Sign Up</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f0f0f0" },
//   card: { background: "#fff", padding: "30px", borderRadius: "12px", boxShadow: "0 8px 20px rgba(0,0,0,0.1)", width: "350px", textAlign: "center" },
//   title: { marginBottom: "20px", fontSize: "26px", fontWeight: "bold", color: "#4CAF50" },
//   form: { display: "flex", flexDirection: "column", gap: "12px" },
//   input: { padding: "12px", fontSize: "16px", borderRadius: "6px", border: "1px solid #ccc" },
//   button: { padding: "12px", fontSize: "16px", backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", marginTop: "10px" },
//   text: { marginTop: "15px", fontSize: "14px", color: "#555" },
// };

// export default LoginPage;



import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
  const { login, loading } = useUserStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email: formData.email.trim(), password: formData.password });
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-80">
        <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">Login</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            disabled={loading}
            className={`p-3 rounded-md text-white font-semibold ${loading ? "bg-green-300" : "bg-green-600 hover:bg-green-700"}`}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Not a member? <Link to="/signup" className="text-green-600 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

