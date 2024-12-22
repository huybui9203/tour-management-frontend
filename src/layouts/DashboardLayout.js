import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../pages/Admin/Header";
import AuthGuard from "../components/Guard/AuthGuard";
import AdminGuard from "../components/Guard/AdminGuard";

const DashboardLayout = () => {
    return (
        <div>
            <Header />
            <div className="main flex justify-center bg-[#f8f8f8]">
                <AdminGuard>
                    <main className="w-[1156px] max-w-full h-screen max-xl:px-16 max-md:px-8 max-sm:px-2">
                        <Outlet />
                    </main>
                </AdminGuard>
            </div>
        </div>
    );
};

export default DashboardLayout;