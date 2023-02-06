import React, { Fragment, useContext, useMemo } from "react";
import Phase from "../../../../enum/Phase";
import { CardType } from "../../../../services/DeckService";
import { GameContext } from "../GameView";
import styles from "./../../../../assets/scss/module/GameStats.module.scss";

export type Round = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type Round1ExpectedWinners = 0 | 1;
export type Round2ExpectedWinners = 0 | 1 | 2;
export type Round3ExpectedWinners = 0 | 1 | 2 | 3;
export type Round4ExpectedWinners = 0 | 1 | 2 | 3 | 4;
export type Round5ExpectedWinners = 0 | 1 | 2 | 3 | 4 | 5;
export type Round6ExpectedWinners = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type Round7ExpectedWinners = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type Round8ExpectedWinners = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Round9ExpectedWinners = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Round10ExpectedWinners = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type PlayerStatsRound<T> = {
	expectedWinners?: T;
	actualWinners?: T;
	points?: number;
	playedCard?: CardType;
};

export type PlayerStatsRound1 = PlayerStatsRound<Round1ExpectedWinners>;
export type PlayerStatsRound2 = PlayerStatsRound<Round2ExpectedWinners>;
export type PlayerStatsRound3 = PlayerStatsRound<Round3ExpectedWinners>;
export type PlayerStatsRound4 = PlayerStatsRound<Round4ExpectedWinners>;
export type PlayerStatsRound5 = PlayerStatsRound<Round5ExpectedWinners>;
export type PlayerStatsRound6 = PlayerStatsRound<Round6ExpectedWinners>;
export type PlayerStatsRound7 = PlayerStatsRound<Round7ExpectedWinners>;
export type PlayerStatsRound8 = PlayerStatsRound<Round8ExpectedWinners>;
export type PlayerStatsRound9 = PlayerStatsRound<Round9ExpectedWinners>;
export type PlayerStatsRound10 = PlayerStatsRound<Round10ExpectedWinners>;

export type PlayerStats = {
	total: number;
	round: PlayerStatsType;
};

export type CardActionType = {
	playerName: string;
	value: number;
};

export type PlayerStatsType = {
	1?: PlayerStatsRound1;
	2?: PlayerStatsRound2;
	3?: PlayerStatsRound3;
	4?: PlayerStatsRound4;
	5?: PlayerStatsRound5;
	6?: PlayerStatsRound6;
	7?: PlayerStatsRound7;
	8?: PlayerStatsRound8;
	9?: PlayerStatsRound9;
	10?: PlayerStatsRound10;
};

export type GameStatsType = {
	[key: string]: PlayerStats;
};

export type GameState = {
	owner: string;
	id: string;
	currentPlayer: string;
	hand: CardType[];
	stats: GameStatsType;
	round: Round;
	playedCards: CardActionType[];
	order: string[];
	phase: Phase;
	validResponseCardIds: number[];
	strongestCardId: number;
};

const ROUNDS: Round[] = [...new Array(10)].map((v, i) => (i + 1) as Round);

export default function GameStats() {
	const state = useContext(GameContext);
	const { stats: data, round: currentRound } = state.gameState;
	const playerNames = Object.keys(data);
	const isGameOver = state.gameState.phase === Phase.GAME_OVER;

	const RoundStatsRow = ({ round }: { round: Round }) => (
		<tr
			className={
				round < currentRound || isGameOver
					? styles["row__completed"]
					: round === currentRound
					? isGameOver
						? ""
						: styles["row__current"]
					: styles["row__uncompleted"]
			}
		>
			<td>{round}</td>
			{playerNames.map((playerName) => (
				<Fragment key={playerName}>
					<td>{data[playerName].round[round]?.expectedWinners}</td>
					<td>{data[playerName].round[round]?.points}</td>
				</Fragment>
			))}
		</tr>
	);

	const TotalStatsRow = () => (
		<tr>
			<td>Σ</td>
			{playerNames.map((playerName) => (
				<td colSpan={2} key={playerName}>
					{data[playerName].total}
				</td>
			))}
		</tr>
	);

	const CurrentWinners = () => (
		<tr className={styles["row__current"]}>
			<td>{currentRound}</td>
			{playerNames.map((playerName) => (
				<React.Fragment key={playerName}>
					<td>{data[playerName].round[currentRound]?.expectedWinners}</td>
					<td>{data[playerName].round[currentRound]?.actualWinners}</td>
				</React.Fragment>
			))}
		</tr>
	);

	const GameStatsHeaderRow = () => (
		<tr>
			<th></th>
			{playerNames.map((playerName) => (
				<th colSpan={2} key={playerName}>
					{playerName}
				</th>
			))}
		</tr>
	);

	return (
		<div>
			<table className={styles.table}>
				<thead>
					<GameStatsHeaderRow />
				</thead>
				<tbody>
					{!isGameOver && <CurrentWinners />}
					<TotalStatsRow />
					{ROUNDS.map((round) => (
						<RoundStatsRow key={round} round={round} />
					))}
				</tbody>
			</table>
		</div>
	);
}
