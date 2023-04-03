import React, { useContext } from "react";
import { GameContext } from "../../GameView";
import AuthService from "../../../../../services/AuthService";
import Shape from "../../Shape";
import ChooseWinnersAction from "../action/ChooseWinnersAction";
import Loader from "../../../../ui/Loader";

export default function ChooseWinners() {
	const { gameState } = useContext(GameContext);
	const { round, currentPlayer } = gameState;

	function render(player: string): React.ReactNode {
		const isThisPlayerOnTurn = AuthService.username === currentPlayer;
		const isCurrentPlayer = player === currentPlayer;
		if (isThisPlayerOnTurn && isCurrentPlayer) {
			return <ChooseWinnersAction round={round} />;
		}
		if (isCurrentPlayer) {
			return <Loader />;
		}
		return null as any;
	}

	return <Shape render={render} />;
}
