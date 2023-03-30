import { CardType } from "../../../../services/DeckService";
import GameStateService from "../../../../services/GameStateService";
import Card from "../../../common/Card";

export type ActionCardProps = {
	card: CardType;
	disabled?: boolean;
	roomId: string;
};

export default function ActionCard({
	card,
	disabled,
	roomId,
}: ActionCardProps) {
	const cardId = card.id;
	const isScaryMaryCard = cardId === 65 || cardId === 66;

	async function handleOnClick() {
		if (disabled) {
			return;
		}

		let cardIdCustom = cardId;
		if (isScaryMaryCard) {
			if (
				confirm("Choose Scary Mary card type\n\nEscape == Cancel\nPirate == OK")
			) {
				cardIdCustom = 66;
			} else {
				cardIdCustom = 65;
			}
		}

		await GameStateService.executeAction(roomId, cardIdCustom);
	}

	return (
		<Card
			isFromPlayground={false}
			card={card}
			onClick={() => handleOnClick()}
			className={`w-16 max-w-32 ${
				disabled
					? "opacity-60 cursor-not-allowed"
					: "transition ease-in-out hover:-translate-y-2 cursor-pointer hover:outline-green-500 hover:outline hover:outline-4 hover:outline-offset-2 rounded-[0.25rem]"
			}`}
		/>
	);
}
