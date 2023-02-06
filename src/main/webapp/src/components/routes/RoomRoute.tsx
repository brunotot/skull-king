import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoomDisplayDto } from "../../dto/RoomDisplayDto";
import AuthService from "../../services/AuthService";
import RoomService from "../../services/RoomService";
import Room from "../views/room/RoomView";
import NotFound from "../layout/NotFound";
import SocketEvent from "../../enum/SocketEvent";
import useSocketHandler from "../../hooks/useSocketHandler";

export default function RoomRoute() {
	const navigate = useNavigate();
	const { roomId } = useParams();
	const [loading, setLoading] = useState(true);
	const [room, setRoom] = useState<RoomDisplayDto | undefined>(undefined);

	useSocketHandler<RoomDisplayDto>(SocketEvent.UPDATE_ROOM, (room) =>
		setRoom(room)
	);
	useSocketHandler<string>(SocketEvent.DELETE_ROOM, (roomId) => {
		if (roomId === roomId) {
			navigate("/");
		}
	});

	useEffect(() => {
		const fetchRoom = async () => {
			const room = await RoomService.findById(roomId!);
			setLoading(false);
			setRoom(
				room?.playerNames.includes(AuthService.username) ? room : undefined
			);
		};
		fetchRoom();

		return () => setRoom(undefined);
	}, []);

	return loading ? <></> : room ? <Room room={room} /> : <NotFound />;
}
