import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import Tour from "./pages/Tour/Tour";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";
import TourDetail from "./pages/Tour/TourDetail";
import Booking from "./pages/Booking/Booking";
import AuthGuard from "./components/Guard/AuthGuard";
import HomeLayout from "./layouts/HomeLayout";
import Dashboard from "./pages/Admin/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import LoginPage from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeLayout />}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route path="/" element={<MainLayout />}>
                    <Route path="/tour" element={<Tour />} />
                    <Route path="/destinations" element={<h1>List destinations page</h1>} />
                    <Route path="/tour/:title" element={<TourDetail />} />
                    <Route
                        path="/booking/:id"
                        element={
                            <AuthGuard>
                                <Booking />
                            </AuthGuard>
                        }
                    />
                </Route>
                <Route path="/" element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="/bookings" element={<h1>Table booking</h1>}></Route>
                    <Route path="/accounts" element={<h1>Table account</h1>}></Route>
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
