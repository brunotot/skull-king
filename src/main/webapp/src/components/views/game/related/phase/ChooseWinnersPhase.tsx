import Button from "../../../../ui/Button";
import { useContext } from "react";
import { GameContext } from "../../GameView";
import AuthService from "../../../../../services/AuthService";
import PlayerNotOnTurn from "../PlayerNotOnTurn";
import GameStateService from "../../../../../services/GameStateService";

export default function ChooseWinners() {
	const { gameState } = useContext(GameContext);
	const { round, currentPlayer, id } = gameState;
	const thisUsername = AuthService.username;
	const isThisPlayerOnTurn = thisUsername === currentPlayer;

	if (!isThisPlayerOnTurn) {
		return <PlayerNotOnTurn />;
	}

	async function onExpectedWinnersChooseClick(expectedWinners: number) {
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
	);
}
