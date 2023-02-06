import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";

export type RoomPlayerProps = {
	username?: string;
};

export default function RoomPlayer(props: RoomPlayerProps) {
	const { username } = props;
	return username ? (
		<div className="flex gap-2 justify-center items-center p-2">
			<FontAwesomeIcon icon={faUserAlt} />
			{username}
		</div>
	) : (
		<div className="text-center p-2 text-xs text-gray-500">Empty slot</div>
	);
}
