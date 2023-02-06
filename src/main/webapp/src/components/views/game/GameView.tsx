import { createContext, useEffect, useState } from "react";
import GameStateService from "../../../services/GameStateService";
import GameStats, { GameState } from "./related/GameStats";
import PlayerHand from "./related/PlayerHand";
import Playground from "./related/Playground";
import { useParams } from "react-router-dom";
import SocketEvent from "../../../enum/SocketEvent";
import { GameStateDto } from "../../../dto/GameStateDto";
import usePrivateSocketHandler from "../../../hooks/usePrivateSocketHandler";

// TODO: Placeholder before backend data arrives
/*const placeholder: GameState = {
	hand: [DeckService.getCard(1)],
	round: 1,
	stats: {
		Sanja: {
			total: 0,
			round: {},
		},
		Bruno: {
			total: 0,
			round: {},
		},
		Tihana: {
			total: 0,
			round: {},
		},
		Marko: {
			total: 0,
			round: {},
		},
	},
};*/

export type IGameContext = {
	gameState: GameState;
	setGameState: (gameState: GameState) => void;
};

export const GameContext = createContext<IGameContext>(null as any);

export default function GameView() {
	const { roomId } = useParams();
	const [gameState, setGameState] = useState<GameState>(undefined as any);
	const ctx: IGameContext = { gameState, setGameState };

	useEffect(() => {
		const loadGameState = async () => {
			const fetchedGameState = await GameStateService.findById(roomId!);
			setGameState(fetchedGameState);
		};

		loadGameState();
	}, []);

	usePrivateSocketHandler<GameStateDto>(
		SocketEvent.UPDATE_GAME,
		(gameStateDto) => {
			const updatedGameState = GameStateService.convertGameState(gameStateDto);
			setGameState(updatedGameState);
		}
	);

	return (
		<>
			{gameState && (
				<GameContext.Provider value={ctx}>
					<div className="h-full flex flex-1 flex-col p-4 gap-4">
						<div className="flex flex-1 gap-16 justify-between">
							<Playground />
							<GameStats />
						</div>
						<PlayerHand />
					</div>
				</GameContext.Provider>
			)}
		</>
	);
}
