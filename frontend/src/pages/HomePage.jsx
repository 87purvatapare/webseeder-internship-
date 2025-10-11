// import { Link } from "react-router-dom";

// const HomePage = () => {
//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Welcome to WebSeeder Authentication System</h1>
//       <p style={styles.subtitle}>Secure Login & Signup for Authorized Access</p>

//       <div style={styles.buttonContainer}>
//         <Link to="/login" style={styles.button}>Login</Link>
//         <Link to="/signup" style={{ ...styles.button, backgroundColor: "#28a745" }}>Signup</Link>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     minHeight: "100vh",
//     backgroundColor: "#f8f9fa",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     textAlign: "center",
//     fontFamily: "Arial, sans-serif",
//     padding: "20px",
//   },
//   title: {
//     fontSize: "32px",
//     color: "#333",
//     marginBottom: "10px",
//   },
//   subtitle: {
//     fontSize: "18px",
//     color: "#666",
//     marginBottom: "30px",
//   },
//   buttonContainer: {
//     display: "flex",
//     gap: "15px",
//   },
//   button: {
//     backgroundColor: "#007bff",
//     color: "white",
//     padding: "10px 20px",
//     textDecoration: "none",
//     borderRadius: "5px",
//     fontSize: "16px",
//   },
// };



// export default HomePage;


import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to WebSeeder Authentication System</h1>
      <p className="text-gray-600 mb-6">Secure Login & Signup for Authorized Access</p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-5 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold"
        >
          Signup
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
