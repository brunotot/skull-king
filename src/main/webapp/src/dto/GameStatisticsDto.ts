import {
	Round10ExpectedWinners,
	Round1ExpectedWinners,
	Round2ExpectedWinners,
	Round3ExpectedWinners,
	Round4ExpectedWinners,
	Round5ExpectedWinners,
	Round6ExpectedWinners,
	Round7ExpectedWinners,
	Round8ExpectedWinners,
	Round9ExpectedWinners,
} from "../components/views/game/related/GameStats";
import { CardDto } from "./CardDto";

type GameStatisticsDto = {
	[key: string]: PlayerStatsDto;
};

export type PlayerStatsRound<T> = {
	expectedWinners?: T;
	points?: number;
	playedCard?: CardDto;
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

export type PlayerStatsDto = {
	total: number;
	round: PlayerStatsTypeDto;
};

export type PlayerStatsTypeDto = {
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

export type { GameStatisticsDto };
