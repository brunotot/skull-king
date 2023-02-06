import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faRightFromBracket,
	faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { RoomDisplayDto } from "../../../../dto/RoomDisplayDto";
import AuthService from "../../../../services/AuthService";
import RoomService from "../../../../services/RoomService";

export type RoomDisplayProps = {
	room: RoomDisplayDto;
};

export const MAX_PLAYERS = 6;

export default function RoomDisplay(props: RoomDisplayProps) {
	const navigate = useNavigate();
	const { id: roomId, playerNames: players } = props.room;
	const numberOfPlayers = players.length;
	const isRoomFull = numberOfPlayers === MAX_PLAYERS;
	const isUserInsideRoom = players.some(
		(username) => username === AuthService.username
	);

	async function onRoomEnter() {
		if (isUserInsideRoom) {
			navigate(`/${roomId}`);
			return;
		}
		if (isRoomFull) {
			return;
		}
		await RoomService.enter(roomId);
		navigate(`/${roomId}`);
	}

	async function onRoomLeave(e: any) {
		e.stopPropagation();
		await RoomService.leave(roomId);
	}

	return (
		<div
			onClick={() => onRoomEnter()}
			className={`flex flex-col gap-1 rounded p-2 ${
				isRoomFull
					? isUserInsideRoom
						? `bg-orange-100 cursor-pointer hover:bg-orange-200 hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-orange-500`
						: "bg-red-100 cursor-not-allowed"
					: "bg-green-100 cursor-pointer hover:bg-green-300 hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-green-500"
			}`}
		>
			<span className="flex gap-4 justify-between">
				<span className="flex gap-2 items-center">
					{isUserInsideRoom && (
						<FontAwesomeIcon
							onClick={(e) => onRoomLeave(e)}
							className="text-red-500 rounded outline outline-1 p-1 hover:outline-2"
							icon={faRightFromBracket}
						/>
					)}
					<FontAwesomeIcon icon={faUserAlt} />
					<span>{players[0]}</span>
				</span>
				<span
					className={`font-bold ${
						isRoomFull ? "text-red-500" : "text-green-500"
					}`}
				>
					{numberOfPlayers} / {MAX_PLAYERS}
				</span>
			</span>
			<span className="text-xs text-gray-600">{players.join(", ")}</span>
		</div>
	);
}
