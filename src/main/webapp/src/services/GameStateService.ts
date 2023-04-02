import {
	GameState,
	GameStatsType,
	PlayerStatsRound,
	PlayerStatsType,
} from "../components/views/game/related/GameStats";
import { GameStateDto } from "../dto/GameStateDto";
import {
	GameStatisticsDto,
	PlayerStatsTypeDto,
} from "../dto/GameStatisticsDto";
import ApiService from "./ApiService";
import DeckService from "./DeckService";

function buildPlayerRoundStats<T>(
	dto: PlayerStatsTypeDto,
	round: T
): PlayerStatsRound<T> {
	return {
		expectedWinners: (dto as any)[round]?.expectedWinners,
		actualWinners: (dto as any)[round]?.actualWinners,
		points: (dto as any)[round]?.points,
		playedCard: (dto as any)[round]?.playedCard
			? DeckService.getCard((dto as any)[round]?.playedCard.id)
			: undefined,
	};
}

function convertGameStats(gameStatsDtoCopy: GameStatisticsDto): GameStatsType {
	const gameStatsDto: GameStatisticsDto = gameStatsDtoCopy
		? gameStatsDtoCopy
		: {};
	const gameStats: GameStatsType = {};
	Object.keys(gameStatsDto).forEach((player) => {
		const playerStatsDto = gameStatsDto[player];
		const playerRoundStatsDto = playerStatsDto.round
			? playerStatsDto.round
			: {};
		const playerRoundStats: PlayerStatsType = Object.keys(
			playerRoundStatsDto
		).reduce(
			(prev, round) => ({
				...prev,
				[round]: buildPlayerRoundStats(playerRoundStatsDto, round),
			}),
			{}
		);
		gameStats[player] = {
			total: playerStatsDto.total,
			round: playerRoundStats,
		};
	});
	return gameStats;
}

class GameStateService extends ApiService {
	constructor() {
		super("/game");
	}

	async start(roomId: string) {
		return await this.post(`/${roomId}/start`);
	}

	async findById(roomId: string): Promise<GameState> {
		const gameStateDto = await this.get<GameStateDto>(`/${roomId}`) as GameStateDto;
		return this.convertGameState(gameStateDto);
	}

	async executeAction(roomId: string, cardId: number): Promise<void> {
		await this.post(`/${roomId}/play-card/${cardId}`);
	}

	convertGameState(gameStateDto: GameStateDto): GameState {
		return {
			id: gameStateDto.id,
			owner: gameStateDto.owner,
			hand: gameStateDto.hand.map((card) => DeckService.getCard(card.id)),
			round: gameStateDto.round,
			stats: convertGameStats(gameStateDto.stats),
			currentPlayer: gameStateDto.currentPlayer,
			playedCards: gameStateDto.playedCards,
			order: gameStateDto.order,
			phase: gameStateDto.phase,
			validResponseCardIds: gameStateDto.validResponseCardIds,
			strongestCardId: gameStateDto.strongestCardId,
		};
	}
}

export default new GameStateService();
