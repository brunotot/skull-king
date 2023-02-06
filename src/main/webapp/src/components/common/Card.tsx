import { CardType } from "../../services/DeckService";
import ScaryMaryData from "./ScaryMaryData";

export type CardProps = {
	card: CardType;
	onClick?: () => void;
	className?: string;
	isFromPlayground: boolean;
};

export default function Card(props: CardProps) {
	const { card, onClick, className, isFromPlayground } = props;
	const { id, image } = card;

	return (
		<div className="relative">
			<ScaryMaryData card={card} isCardFromPlayground={isFromPlayground} />
			<img onClick={onClick} className={`h-full ${className}`} src={image} />
		</div>
	);
}
