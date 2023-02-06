import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";
import { CardType } from "../../services/DeckService";

export type ScaryMaryDataProps = {
	card: CardType;
	isCardFromPlayground: boolean;
};

export default function ScaryMaryData(props: ScaryMaryDataProps) {
	const { card, isCardFromPlayground } = props;
	const cardId = card.id;

	// Scary Mary card specifics
	if (!isCardFromPlayground || (cardId !== 65 && cardId !== 66)) {
		return <></>;
	}

	return (
		<div className="absolute w-full h-full flex items-center justify-center">
			<div className="bg-white rounded p-3 outline outline-3">
				{cardId === 65 && (
					<FontAwesomeIcon
						className="text-green-500"
						size="2xl"
						icon={faFlag}
					/>
				)}
				{cardId === 66 && (
					<FontAwesomeIcon
						className="text-red-500"
						size="2xl"
						icon={faSkullCrossbones}
					/>
				)}
			</div>
		</div>
	);
}
