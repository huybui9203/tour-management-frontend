import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../pages/Admin/Header";
import AuthGuard from "../components/Guard/AuthGuard";

const DashboardLayout = () => {
    return (
        <div>
            <Header />
            <div className="main flex justify-center mt-[68px]">
                <AuthGuard>
                    <main className="w-[1156px] max-w-full max-xl:px-16 max-md:px-8 max-sm:px-2">
                        <Outlet />
                    </main>
                </AuthGuard>
            </div>
        </div>
    );
};

export default DashboardLayout;