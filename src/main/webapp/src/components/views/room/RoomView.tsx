import { faPlay, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { RoomDisplayDto } from "../../../dto/RoomDisplayDto";
import RoomService from "../../../services/RoomService";
import RoomPlayer from "./related/RoomPlayer";
import { useNavigate } from "react-router-dom";
import { MAX_PLAYERS } from "../home/related/RoomDisplay";
import Button from "../../ui/Button";
import useSocketHandler from "../../../hooks/useSocketHandler";
import SocketEvent from "../../../enum/SocketEvent";
import GameStateService from "../../../services/GameStateService";
import AuthService from "../../../services/AuthService";

export type RoomProps = {
	room: RoomDisplayDto;
};

export default function RoomView(props: RoomProps) {
	const navigate = useNavigate();
	const { room } = props;
	const { playerNames } = room;
	const playerNamesLength = playerNames.length;

	const playerNamesNormalized = [...new Array(MAX_PLAYERS)].map((v, i) =>
		i < playerNamesLength ? playerNames[i] : undefined
	);

	async function onRoomLeave() {
		RoomService.leave(room.id);
		navigate("/");
	}

	async function onGameStart() {
		GameStateService.start(room.id);
	}

	useSocketHandler<string>(SocketEvent.START_GAME, (id) =>
		navigate(`/${id}/game`)
	);

	return (
		<div className="flex flex-col gap-3">
			<div className="flex flex-col gap-2 rounded bg-white">
				{playerNamesNormalized.map((playerName, i) => (
					<RoomPlayer key={i} username={playerName} />
				))}
			</div>
			<div className="flex gap-2">
				<Button
					onClick={() => onRoomLeave()}
					tailwindColor="red"
					iconType={faRightFromBracket}
					text="Leave"
				/>
				{room.owner === AuthService.username && (
					<Button
						onClick={() => onGameStart()}
						tailwindColor="green"
						iconType={faPlay}
						text="Start"
					/>
				)}
			</div>
		</div>
	);
}
