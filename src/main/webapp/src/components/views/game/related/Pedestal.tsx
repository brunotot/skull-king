import { useContext } from "react";
import { GameContext } from "../GameView";
import { GameStatsType } from "./GameStats";
import PlayerResult, { PlacementType, PlayerResultProps } from "./PlayerResult";

export type PlayerResultListType = PlayerResultProps[];

function buildPlayerResultList(stats: GameStatsType): PlayerResultProps[] {
	return Object.entries(stats)
		.sort(([, p1], [, p2]) => p2.total - p1.total)
		.map((e, i) => ({
			player: e[0],
			placement: (i + 1) as PlacementType,
			points: e[1].total,
		}));
}

export default function Pedestal() {
	const ctx = useContext(GameContext);
	const { stats } = ctx.gameState;
	const playerResultList = buildPlayerResultList(stats);
	const winner = playerResultList[0];

	return (
		<div className="flex flex-col gap-4 items-center">
			<div className="text-center text-3xl text-white pb-8">
				<span className="font-bold text-red-300">{winner.player}</span> wins
				with {winner.points} points
			</div>
			{playerResultList.map((playerResultProps) => (
				<PlayerResult key={playerResultProps.player} {...playerResultProps} />
			))}
		</div>
	);
}
