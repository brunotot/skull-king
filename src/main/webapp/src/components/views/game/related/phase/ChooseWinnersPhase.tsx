import React, {useContext} from "react";
import {GameContext} from "../../GameView";
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
			return <ChooseWinnersAction round={round} />
		}
		if (isCurrentPlayer) {
			return <Loader />
		}
		return null as any;
	}

	return <Shape render={render} />

	/*async function onExpectedWinnersChooseClick(expectedWinners: number) {
		await GameStateService.executeAction(id, expectedWinners);
	}

	return (
		<div className="w-full h-full flex flex-col gap-4 items-center justify-center">
			<div className="text-2xl font-bold text-white">
				Choose number of expected winners
			</div>
			<div className="flex flex-wrap gap-4 px-8 justify-center">
				{[...new Array(round + 1)].map((v, i) => (
					<Button
						onClick={() => onExpectedWinnersChooseClick(i)}
						classNameAppend="px-8 font-bold text-2xl"
						tailwindColor="green"
						text={i.toString()}
						key={i}
					/>
				))}
			</div>
		</div>
	);*/
}
