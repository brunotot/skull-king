import React, {Fragment, useContext, useMemo, useState} from "react";
import Phase from "../../../../enum/Phase";
import { CardType } from "../../../../services/DeckService";
import { GameContext } from "../GameView";
import styles from "./../../../../assets/scss/module/GameStats.module.scss";
import Button from "../../../ui/Button";
import { faMinimize, faMaximize } from "@fortawesome/free-solid-svg-icons";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

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
	const [expanded, setExpanded] = useState(false);
	const { stats: data, round: currentRound } = state.gameState;
	const playerNames = Object.keys(data);
	const isGameOver = state.gameState.phase === Phase.GAME_OVER;

	const RoundStatsRow = ({ round }: { round: Round }) => (
		<TableRow
			className={`${expanded ? '' : '!hidden'}
				${round < currentRound || isGameOver
					? styles["row__completed"]
					: round === currentRound
					? isGameOver
						? ""
						: styles["row__current"]
					: styles["row__uncompleted"]}
			`}
		>
			<TableCell>{round}</TableCell>
			{playerNames.map((playerName) => (
				<Fragment key={playerName}>
					<TableCell>{data[playerName].round[round]?.expectedWinners}</TableCell>
					<TableCell>{data[playerName].round[round]?.points}</TableCell>
				</Fragment>
			))}
		</TableRow>
	);

	const TotalStatsRow = () => (
		<TableRow>
			<TableCell>Σ</TableCell>
			{playerNames.map((playerName) => (
				<TableCell colSpan={2} key={playerName}>
					{data[playerName].total}
				</TableCell>
			))}
		</TableRow>
	);

	const CurrentWinners = () => (
		<TableRow className={styles["row__current"]}>
			<TableCell>{currentRound}</TableCell>
			{playerNames.map((playerName) => (
				<React.Fragment key={playerName}>
					<TableCell>{data[playerName].round[currentRound]?.expectedWinners}</TableCell>
					<TableCell>{data[playerName].round[currentRound]?.actualWinners}</TableCell>
				</React.Fragment>
			))}
		</TableRow>
	);

	const GameStatsHeaderRow = () => (
		<TableRow>
			<TableCell>
				<Button
					onClick={() => setExpanded(!expanded)}
					iconType={expanded ? faMinimize : faMaximize}
					tailwindColor={"green"}
					classNameAppend="text-black"
				/>
			</TableCell>
			{playerNames.map((playerName) => (
				<TableCell colSpan={2} key={playerName}>
					{playerName}
				</TableCell>
			))}
		</TableRow>
	);

	return (
		<div className="relative">
			<TableContainer component={Paper}>
				<Table size="small" className={`${styles.table} z-10 absolute lg:relative`}>
					<TableHead>
						<GameStatsHeaderRow />
					</TableHead>
					<TableBody>
						{!isGameOver && <CurrentWinners />}
						<TotalStatsRow />
						{ROUNDS.map((round) => (
							<RoundStatsRow key={round} round={round} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}
