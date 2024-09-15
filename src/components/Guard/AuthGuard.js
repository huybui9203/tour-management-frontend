import { Navigate } from "react-router-dom"

const AuthGuard = ({children}) => {
    const isAuthenticated = 0
    if(!isAuthenticated) {
        return <Navigate to={'/login'} replace />
    } 
    return <>{children}</>
}

export default AuthGuard