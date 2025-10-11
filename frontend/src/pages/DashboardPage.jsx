

// import { useUserStore } from "../stores/useUserStore";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// const DashboardPage = () => {
//   const { user, logout, checkAuth } = useUserStore();
//   const navigate = useNavigate();

//   useEffect(() => {
//     checkAuth();
//     if (!user) navigate("/login");
//   }, [user, navigate, checkAuth]);

//   const handleLogout = async () => {
//     await logout();
//     navigate("/login");
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-600">
//       <div className="bg-white p-10 rounded-xl shadow-xl w-96 text-center">
//         <h2 className="text-3xl font-extrabold text-blue-700 mb-4">
//           Welcome, {user?.name || "User"}!
//         </h2>
//         <p className="text-gray-600 mb-6">Your secure dashboard overview.</p>

//         <div className="flex flex-col gap-4 mb-6">
//           {/* Account Info */}
//           <div className="bg-blue-50 p-4 rounded-lg shadow-md hover:shadow-lg transition">
//             <h3 className="text-blue-700 font-semibold mb-1">Account Info</h3>
//             <p className="text-gray-700 text-sm">{user?.name || "N/A"}</p>
//           </div>

//           {/* Membership Status */}
//           <div className="bg-green-50 p-4 rounded-lg shadow-md hover:shadow-lg transition">
//             <h3 className="text-green-700 font-semibold mb-1">Membership Status</h3>
//             <p className="text-gray-700 text-sm">Active Member</p>
//           </div>

//           {/* Recent Activity */}
//           <div className="bg-yellow-50 p-4 rounded-lg shadow-md hover:shadow-lg transition">
//             <h3 className="text-yellow-700 font-semibold mb-1">Recent Activity</h3>
//             <p className="text-gray-700 text-sm">No recent activity available.</p>
//           </div>
//         </div>

//         <button
//           onClick={handleLogout}
//           className="px-6 py-3 text-white font-semibold bg-red-500 rounded-md hover:bg-red-600 transition"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { User, ShieldCheck, Clock, Settings, Bell } from "lucide-react";

const DashboardPage = () => {
  const { user, logout, checkAuth } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    if (!user) navigate("/login");
  }, [user, navigate, checkAuth]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-300 via-sky-400 to-sky-500 flex flex-col">
      
      {/* Top Navbar */}
      <div className="flex justify-between items-center px-8 py-4 bg-white/20 backdrop-blur-md shadow-md">
        <h1 className="text-xl font-bold text-white">My Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-white">👤 {user?.name || "User"}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center flex-1">
        <div className="bg-white p-10 rounded-xl shadow-xl w-[420px] text-center">
          <h2 className="text-3xl font-extrabold text-sky-700 mb-4">
            Welcome, {user?.name || "User"}!
          </h2>
          <p className="text-gray-600 mb-6">Here's your activity summary.</p>

          <div className="flex flex-col gap-4 mb-6">

            {/* Account Info */}
            <div className="bg-blue-50 p-4 rounded-lg shadow-md hover:shadow-lg transition flex items-center gap-3">
              <User className="text-blue-700" />
              <div>
                <h3 className="text-blue-700 font-semibold">Account Info</h3>
                <p className="text-gray-700 text-sm">{user?.name || "N/A"}</p>
              </div>
            </div>

            {/* Membership Status */}
            <div className="bg-green-50 p-4 rounded-lg shadow-md hover:shadow-lg transition flex items-center gap-3">
              <ShieldCheck className="text-green-700" />
              <div>
                <h3 className="text-green-700 font-semibold">Membership</h3>
                <p className="text-gray-700 text-sm">Active Member</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-yellow-50 p-4 rounded-lg shadow-md hover:shadow-lg transition flex items-center gap-3">
              <Clock className="text-yellow-700" />
              <div>
                <h3 className="text-yellow-700 font-semibold">Recent Activity</h3>
                <p className="text-gray-700 text-sm">No activity yet.</p>
              </div>
            </div>
          </div>

          {/* Future Upgrade Options */}
          <div className="flex justify-center gap-6 text-sm text-gray-600">
            <Settings className="cursor-pointer hover:text-black" />
            <Bell className="cursor-pointer hover:text-black" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
