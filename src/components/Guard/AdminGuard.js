import { useContext } from "react"
import { AuthContext } from "../../context/Auth"
import { Navigate } from "react-router-dom"
import { ROLES } from "../../utils/constants"

const AdminGuard = ({children}) => {
    const {user} = useContext(AuthContext)
    if(user?.role == ROLES.ADMIN || user?.role == ROLES.S_ADMIN) {
        return <>{children}</>
    }

    return <Navigate to='/admin/login'/>
}

export default AdminGuard