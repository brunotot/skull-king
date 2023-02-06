import { useContext } from "react";
import { GameContext } from "../GameView";
import ChooseWinners from "./phase/ChooseWinnersPhase";
import PlaygroundBox from "./PlaygroundBox";
import PlayCardPhase from "./phase/PlayCardPhase";
import GameOverPhase from "./phase/GameOverPhase";
import Phase from "../../../../enum/Phase";
import "./../../../../assets/scss/Playground.scss";

export default function Playground() {
	const { gameState } = useContext(GameContext);
	const { phase } = gameState;

	return (
		<PlaygroundBox>
			{phase === Phase.CHOOSE_WINNERS && <ChooseWinners />}
			{phase === Phase.PLAY_CARD && <PlayCardPhase />}
			{phase === Phase.GAME_OVER && <GameOverPhase />}
		</PlaygroundBox>
	);
}
