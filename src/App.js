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
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import LoginPage from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import BookingAdmin from "./pages/Admin/Booking/Booking";
import Account from "./pages/Admin/Account/Account";
import TourAdmin from "./pages/Admin/Tour/Tour";
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
                        path="/booking/:title"
                        element={
                            <AuthGuard>
                                <Booking />
                            </AuthGuard>
                        }
                    />
                </Route>
                <Route path="/admin/" element={<DashboardLayout />}>
                    <Route path="dashboard" element={<Dashboard />}></Route>
                    <Route path="tours" element={<TourAdmin />}></Route>
                    <Route path="bookings" element={<BookingAdmin />}></Route>
                    <Route path="accounts" element={<Account />}></Route>
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
