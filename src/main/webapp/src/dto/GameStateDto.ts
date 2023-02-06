import { Round } from "../components/views/game/related/GameStats";
import Phase from "../enum/Phase";
import { CardActionDto } from "./CardActionDto";
import { CardDto } from "./CardDto";
import { GameStatisticsDto } from "./GameStatisticsDto";

type GameStateDto = {
	id: string;
	owner: string;
	currentPlayer: string;
	round: Round;
	hand: CardDto[];
	stats: GameStatisticsDto;
	playedCards: CardActionDto[];
	order: string[];
	phase: Phase;
	validResponseCardIds: number[];
	strongestCardId: number;
};

export type { GameStateDto };
