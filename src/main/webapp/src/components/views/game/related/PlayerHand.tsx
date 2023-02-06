import { useContext } from "react";
import { GameContext } from "../GameView";
import ActionCard from "./ActionCard";
import AuthService from "../../../../services/AuthService";
import { useParams } from "react-router-dom";
import Phase from "../../../../enum/Phase";
import "./../../../../assets/scss/PlayerHand.scss";

export default function PlayerHand() {
	const { roomId } = useParams();
	const thisUsername = AuthService.username;
	const { hand, currentPlayer, phase, validResponseCardIds } =
		useContext(GameContext).gameState;
	const isThisUserOnTurn = thisUsername === currentPlayer;
	const isPhasePlayCard = phase === Phase.PLAY_CARD;
	const isCardValid = isThisUserOnTurn && isPhasePlayCard;

	return (
		<div className="player-hand">
			{hand.map((card) => (
				<ActionCard
					key={card.id}
					card={card}
					roomId={roomId!}
					disabled={!isCardValid || !validResponseCardIds.includes(card.id)}
				/>
			))}
		</div>
	);
}
