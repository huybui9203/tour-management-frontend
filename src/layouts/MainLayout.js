import { Outlet } from "react-router-dom"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import AuthGuard from "../components/Guard/AuthGuard"

const MainLayout = () => {
    return (
        <div>
            <Header/>
            <div className="main">
                <AuthGuard>
                    <Outlet />
                </AuthGuard>
            </div>
            <Footer/>
        </div>
    )
}

export default MainLayout