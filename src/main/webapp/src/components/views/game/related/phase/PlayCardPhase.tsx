import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import usePrivateSocketHandler from "../../../../../hooks/usePrivateSocketHandler";
import AuthService from "../../../../../services/AuthService";
import DeckService from "../../../../../services/DeckService";
import Card from "../../../../common/Card";
import Loader from "../../../../ui/Loader";
import { GameContext } from "../../GameView";
import { Round } from "../GameStats";
import SocketEvent from "../../../../../enum/SocketEvent";
import ChooseWinnersAction from "../action/ChooseWinnersAction";
import Shape from "../../Shape";

function shiftPlayersToStartFromCurrent(
	players: string[],
	current: string
): string[] {
	const currentIndex = players.indexOf(current);
	return [...players.slice(currentIndex), ...players.slice(0, currentIndex)];
}

export default function PlayCardPhase() {
	const { gameState } = useContext(GameContext);
	const playerOnTurn = gameState.currentPlayer;
	const strongestCardId = gameState.strongestCardId;

	function render(player: string): React.ReactNode {
		const playedAction = gameState.playedCards.find((c) => c.playerName === player);
		const playedCardId = playedAction?.value;

		if (playedCardId) {
			const className = "w-[20cqi] rotate-[90deg] " + (strongestCardId !== playedCardId ? "opacity-50" : "");
			return <Card
				className={className}
				card={DeckService.getCard(playedCardId)}
				isFromPlayground={true}
			/>
		}

		if (!playedCardId && player === playerOnTurn) {
			return <Loader />
		}

		return null as any;
	}

	return <Shape render={render} />

	/*return (
		<>
			<div ref={centerRef} className="radial_center"/>
			{playersByOrder.map((playerName, i) => {
				const playedAction = state.gameState.playedCards.find(
					(c) => c.playerName === playerName
				);
				let playedCardId = playedAction?.value;

				return (
					<div
						key={playerName}
						ref={(el) => ((playersRef.current as any)[i] = el)}
						className="radial_edge"
					>
						<div className="radial_edge_content">
							<span className="text-center text-white truncate">
								{playerName}
							</span>
							{playedCardId && (
								<Card
									className={
										strongestCardId !== playedCardId ? "opacity-50" : ""
									}
									card={DeckService.getCard(playedCardId)}
									isFromPlayground={true}
								/>
							)}
							{!playedCardId && playerName === playerOnTurn && (
								<div className="flex w-full justify-center pt-2">
									<Loader />
								</div>
							)}
						</div>
					</div>
				);
			})}
		</>
	);*/
}
