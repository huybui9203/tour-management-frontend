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
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeLayout/>}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route path="/" element={<MainLayout />}>
                    <Route path="/tour" element={<Tour />} />
                    <Route path="/destinations" element={<h1>List destinations page</h1>} />
                    <Route path="/tour/:title" element={<TourDetail />} />
                    <Route path="/booking/:id" element={
                        <AuthGuard>
                            <Booking />
                        </AuthGuard>
                    } />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<h1>Register Page</h1>} /> 
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
