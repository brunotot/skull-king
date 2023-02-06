import { useContext, useEffect, useMemo, useRef, useState } from "react";
import usePrivateSocketHandler from "../../../../../hooks/usePrivateSocketHandler";
import AuthService from "../../../../../services/AuthService";
import DeckService from "../../../../../services/DeckService";
import Card from "../../../../common/Card";
import Loader from "../../../../ui/Loader";
import { GameContext } from "../../GameView";
import { Round } from "../GameStats";
import SocketEvent from "../../../../../enum/SocketEvent";

function shiftPlayersToStartFromCurrent(
	players: string[],
	current: string
): string[] {
	const currentIndex = players.indexOf(current);
	return [...players.slice(currentIndex), ...players.slice(0, currentIndex)];
}

export default function PlayCardPhase() {
	const state = useContext(GameContext);
	const strongestCardId = state.gameState.strongestCardId;
	const playersByOrder = shiftPlayersToStartFromCurrent(
		state.gameState.order,
		AuthService.username
	);
	const playerOnTurn = state.gameState.currentPlayer;
	const centerRef = useRef<HTMLDivElement>(null);
	const playersRef = useRef<HTMLDivElement[]>([]);
	const applyRadialConfig = useMemo(
		() => () => {
			let e = playersRef.current;

			if (e.length) {
				let c = centerRef.current as HTMLDivElement;
				let sa = 360 / e.length;
				let i = 0;

				let cw = c.clientWidth || 100;
				let gap = 0.4;

				e.forEach((edge: HTMLDivElement) => {
					let re = edge;
					let ewa = re.clientWidth || 50;
					let rad = (cw + ewa) * (1 + gap);
					let x = Math.cos(sa * i * (Math.PI / 180)) * rad * 1;
					let y = Math.sin(sa * i * (Math.PI / 180)) * rad * 1;
					re.style.inset = x + "px 0 0 " + y + "px";
					i++;
				});
			}
		},
		[]
	);
	useEffect(applyRadialConfig, []);

	return (
		<>
			<div ref={centerRef} className="radial_center"></div>
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
	);
}
