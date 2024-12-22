import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../context/Auth"
import { ROLES } from "../../utils/constants"

const AuthGuard = ({children}) => {
    const {user} = useContext(AuthContext)
    if(user?.role !== ROLES.USER) {
        return <Navigate to={'/login'} replace />
    } 
    return <>{children}</>
}

export default AuthGuard