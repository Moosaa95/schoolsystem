import { useLocation,  Navigate, Outlet} from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "state/authSlice";
import { selectCurrentUser } from "state/authSlice";


const RequireAuth = () => {
    const token = useSelector(selectCurrentToken)
    const user = useSelector(selectCurrentUser)
    console.log("LLLLLLL, 🚀 ~ file: RequiredAuth.js:8 ~ RequireAuth ~ token", token, 'lol')
    const location = useLocation()


    return (
        token 
        ? <Outlet />
        : <Navigate to="/login" state={{from : location }} replace />
    )
}

export default RequireAuth