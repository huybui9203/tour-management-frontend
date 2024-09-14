import { Outlet } from "react-router-dom"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import AuthGuard from "../components/Guard/AuthGuard"

const MainLayout = () => {
    return (
        <div className="">
            <Header/>
            <div className="main flex justify-center mt-[68px]">
                <AuthGuard>
                    <Outlet />
                </AuthGuard>
            </div>
            <Footer/>
        </div>
    )
}

export default MainLayout