import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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



function App() {


  return (

    
    <BrowserRouter>

      {/* Background visible on all pages */}
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/featuredcreators" element={<FeaturedCreators />} />
        <Route path="/influencer" element={<Influencer />} />
        <Route path="/blog" element={<Blog />} />
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
       
      </Routes>

    </BrowserRouter>
  );
}

export default App;