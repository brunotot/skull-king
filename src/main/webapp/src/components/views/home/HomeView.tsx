import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { RoomDisplayDto } from "../../../dto/RoomDisplayDto";
import SocketEvent from "../../../enum/SocketEvent";
import useSocketHandler from "../../../hooks/useSocketHandler";
import RoomService from "../../../services/RoomService";
import Button from "../../ui/Button";
import HorizontalLine from "../../ui/HorizontalLine";
import RoomDisplayList from "./related/RoomDisplayList";
import { useNavigate } from "react-router-dom";

export default function HomeView() {
	const navigate = useNavigate();
	const [roomDisplayList, setRoomDisplayList] = useState<RoomDisplayDto[]>([]);

	useSocketHandler<RoomDisplayDto>(SocketEvent.CREATE_ROOM, (room) =>
		setRoomDisplayList((prev) => [...prev, room])
	);

	useSocketHandler<string>(SocketEvent.DELETE_ROOM, (roomId) =>
		setRoomDisplayList((prev) => [...prev].filter((r) => r.id !== roomId))
	);

	useSocketHandler<RoomDisplayDto>(SocketEvent.UPDATE_ROOM, (room) => {
		setRoomDisplayList((prev) => {
			const prevCopy = [...prev];
			const index = prevCopy.findIndex((o) => o.id === room.id);
			prevCopy[index] = room;
			return prevCopy;
		});
	});

	useEffect(() => {
		const fetchRooms = async () => {
			const rooms = await RoomService.getAll();
			setRoomDisplayList(rooms);
		};

		fetchRooms();

		return () => {
			setRoomDisplayList([]);
		};
	}, []);

	async function onCreateRoomClick() {
		const room = await RoomService.create();
		navigate(`/${room.id}`);
	}

	return (
		<div className="flex flex-col p-8">
			<Button
				onClick={() => onCreateRoomClick()}
				iconType={faAdd}
				text="Create Room"
				tailwindColor="orange"
			/>
			<HorizontalLine />
			<RoomDisplayList roomDisplayList={roomDisplayList} />
		</div>
	);
}
