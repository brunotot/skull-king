import React, { useContext } from "react";
import AuthService from "../../../services/AuthService";
import { GameContext } from "./GameView";
import "./../../../assets/scss/Playground.scss";

type PlayersCount = 2 | 3 | 4 | 5 | 6;

const MAP = {
	2: [1, 4],
	3: [1, 3, 5],
	4: [1, 3, 4, 5],
	5: [1, 2, 3, 4, 5],
	6: [1, 2, 3, 4, 5, 6],
};

function shiftPlayersToStartFromCurrent(
	players: string[],
	current: string
): string[] {
	const currentIndex = players.indexOf(current);
	return [...players.slice(currentIndex), ...players.slice(0, currentIndex)];
}

interface Props {
	players?: string[];
	render: (player: string) => React.ReactNode;
}

const Shape: React.FC<Props> = ({ players: playersNullable, render }) => {
	const { gameState } = useContext(GameContext);
	const players = playersNullable
		? playersNullable
		: shiftPlayersToStartFromCurrent(gameState.order, AuthService.username);
	const length = players.length as PlayersCount;

	return (
		<div className="playground bg-opacity-60 bg-slate-700">
			{MAP[length].map((value, i) => {
				const RenderedComponent = render(players[i]);
				return (
					<div key={players[i]} className="player-box" data-pos={value}>
						<div className="player-avatar" data-username={players[i]} />
						<div className="player-action">{RenderedComponent}</div>
					</div>
				);
			})}
		</div>
	);
};

export default Shape;
