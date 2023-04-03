import React, { useContext } from "react";
import Card from "../../../../common/Card";
import Loader from "../../../../ui/Loader";
import { GameContext } from "../../GameView";
import Shape from "../../Shape";

function shiftPlayersToStartFromCurrent(
	players: string[],
	current: string
): string[] {
	const currentIndex = players.indexOf(current);
	return [...players.slice(currentIndex), ...players.slice(0, currentIndex)];
}

export default function PlayCardPhase() {
	const { gameState } = useContext(GameContext);
	const playerOnTurn = gameState.currentPlayer;
	const strongestCardId = gameState.strongestCardId;

	function render(player: string): React.ReactNode {
		const playedAction = gameState.playedCards.find(
			(c) => c.playerName === player
		);
		const playedCardId = playedAction?.value;

		if (playedCardId) {
			const className =
				"w-[65px] " + (strongestCardId !== playedCardId ? "opacity-50" : "");
			return <Card className={className} id={playedCardId} readonly={true} />;
		}

		if (!playedCardId && player === playerOnTurn) {
			return <Loader />;
		}

		return null as any;
	}

	return <Shape render={render} />;
}
