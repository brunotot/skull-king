import { Route, Routes } from "react-router-dom";
import GameRoute from "../routes/GameRoute";
import HomeRoute from "../routes/HomeRoute";
import RoomRoute from "../routes/RoomRoute";
import LoginRoute from "../routes/LoginRoute";
import PrivateRoutes from "../routes/PrivateRoutes";
import NotFound from "./NotFound";
import RegisterRoute from "../routes/RegisterRoute";

export default function Content() {
	return (
		<div className="flex-1 w-full flex justify-center items-center p-2 lg:p-4">
			<Routes>
				<Route element={<PrivateRoutes />}>
					<Route element={<HomeRoute />} path="/" />
					<Route element={<RoomRoute />} path="/:roomId" />
					<Route element={<GameRoute />} path="/:roomId/game" />
				</Route>
				<Route element={<LoginRoute />} path="/login" />
				<Route element={<RegisterRoute />} path="/register" />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
}
