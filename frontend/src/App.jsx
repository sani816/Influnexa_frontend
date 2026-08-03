import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import FeaturedCreators from "./pages/FeaturedCreators";
import Influencer from "./pages/Influencer";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardHome from "./components/DashboardHome";
 import CreatorProfile from "./pages/creatorProfile";
import ProtectedRouteUser from "./components/ProtectedRouteUser";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Campaigns from "./pages/Campaigns";
import Subscription from "./pages/Subscription";

function App() {


  return (
      <Routes>
        <Route path="/" element={<Login />} />
<Route path="/register" element={<Register />} />
        <Route
        path="/home"
        element={
          <ProtectedRouteUser>
            <Home />
          </ProtectedRouteUser>
        }
      />
        <Route path="/about" element={<About />} />
        <Route path="/featuredcreators" element={<FeaturedCreators />} />
        <Route path="/influencer" element={<Influencer />} />
        <Route path="/blog" element={<Blog />} />
        <Route 
  path="/campaigns" 
  element={<Campaigns />}
/>
<Route
    path="/subscription"
    element={<Subscription/>}
/>
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/admin"
          element={<AdminLogin />}
        />


        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />


 <Route path="*" element={<Navigate to="/" />} />
 
<Route path="/creator/:id"element={<CreatorProfile />}/>
 </Routes>

    
  );
}

export default App;