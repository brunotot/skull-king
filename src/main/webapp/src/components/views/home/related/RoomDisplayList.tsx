import { RoomDisplayDto } from "../../../../dto/RoomDisplayDto";
import RoomDisplay from "./RoomDisplay";
import { useState } from "react";
import { useEffect } from "react";
import AuthService from "../../../../services/AuthService";

export type RoomDisplayListProps = {
	roomDisplayList: RoomDisplayDto[];
};

export default function RoomDisplayList(props: RoomDisplayListProps) {
	const { roomDisplayList } = props;

	if (roomDisplayList.length === 0) {
		return <></>;
	}

	const [existingRoom, setExistingRoom] = useState<RoomDisplayDto | undefined>(
		undefined
	);

	useEffect(() => {
		setExistingRoom(
			roomDisplayList.find((room) =>
				room.playerNames.includes(AuthService.username)
			)
		);
	}, [roomDisplayList]);

	return (
		<div className="flex flex-col gap-8">
			{existingRoom && <RoomDisplay room={existingRoom} />}
			<div className="flex flex-wrap justify-center gap-2">
				{roomDisplayList
					.filter((room) => room.id !== existingRoom?.id)
					.map((room) => (
						<RoomDisplay key={room.id} room={room} />
					))}
			</div>
		</div>
	);
}
