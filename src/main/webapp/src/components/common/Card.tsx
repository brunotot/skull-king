import DeckService, { CardType } from "../../services/DeckService";
import ScaryMaryData from "./ScaryMaryData";
import { useContext } from "react";
import { GameContext } from "../views/game/GameView";
import AuthService from "../../services/AuthService";
import Phase from "../../enum/Phase";

export type CardProps = {
	id: number;
	onClick?: () => void;
	className?: string;
	readonly: boolean;
};

export default function Card(props: CardProps) {
	const { id, onClick, className, readonly } = props;
	const card: CardType = DeckService.getCard(id);
	const { gameState } = useContext(GameContext);
	const { currentPlayer, phase, validResponseCardIds } = gameState;
	const isThisUserOnTurn = AuthService.username === currentPlayer;
	const isPhasePlayCard = phase === Phase.PLAY_CARD;
	const isCardValid = isThisUserOnTurn && isPhasePlayCard;
	const disabled = !isCardValid || !validResponseCardIds.includes(card.id);

	const classNameDisabled = readonly
		? ""
		: disabled
		? "opacity-60 cursor-not-allowed pointer-events-none"
		: "transition ease-in-out hover:-translate-y-2 " +
		  "cursor-pointer rounded-[1rem] game-card";

	return (
		<div className="relative">
			<ScaryMaryData card={card} isCardFromPlayground={readonly} />
			<img
				onClick={onClick}
				className={`h-full w-auto ${className ?? ""} ${classNameDisabled}`}
				src={card.image}
			/>
		</div>
	);
}
