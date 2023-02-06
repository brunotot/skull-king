import Loader from "../../../ui/Loader";
import { useContext } from "react";
import { GameContext } from "../GameView";

export default function PlayerNotOnTurn() {
	const { gameState } = useContext(GameContext);
	const { currentPlayer } = gameState;

	return (
		<div className="flex flex-col gap-4 items-center justify-center text-2xl text-white">
			<span>
				Waiting on <b>{currentPlayer}</b> to choose...
			</span>
			<Loader />
		</div>
	);
}
