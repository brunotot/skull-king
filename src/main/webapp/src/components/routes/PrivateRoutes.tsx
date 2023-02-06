import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../App";

export default function PrivateRoutes() {
	const { auth } = useContext(UserContext);
	return auth ? <Outlet /> : <Navigate to="/login" />;
}
