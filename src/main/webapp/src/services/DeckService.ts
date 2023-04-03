import ImageFactory, { PirateVersionKeys } from "../factory/ImageFactory";

const SCARY_MARY_ESCAPE_ID = 65;
const SCARY_MARY_PIRATE_ID = 66;

type PointCardValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export type CardType = {
	id: number;
	image: string;
};

function getRedCard(id: number, value: PointCardValue): CardType {
	return {
		id,
		image: ImageFactory.colors.red[value],
	};
}

function getYellowCard(id: number, value: PointCardValue): CardType {
	return {
		id,
		image: ImageFactory.colors.yellow[value],
	};
}

function getBlueCard(id: number, value: PointCardValue): CardType {
	return {
		id,
		image: ImageFactory.colors.blue[value],
	};
}

function getBlackCard(id: number, value: PointCardValue): CardType {
	return {
		id,
		image: ImageFactory.colors.black[value],
	};
}

function getPirateCard(id: number, version: PirateVersionKeys): CardType {
	return {
		id,
		image: ImageFactory.specials.pirate[version],
	};
}

function getScaryMaryCard(id: number): CardType {
	return {
		id,
		image: ImageFactory.specials.pirateOrEscape,
	};
}

function getEscapeCard(id: number): CardType {
	return {
		id,
		image: ImageFactory.specials.escape,
	};
}

function getMermaidCard(id: number): CardType {
	return {
		id,
		image: ImageFactory.specials.mermaid,
	};
}

function getSkullKingCard(id: number): CardType {
	return {
		id,
		image: ImageFactory.specials.skullKing,
	};
}

function buildDeck(): CardType[] {
	return [
		getRedCard(1, 1),
		getRedCard(2, 2),
		getRedCard(3, 3),
		getRedCard(4, 4),
		getRedCard(5, 5),
		getRedCard(6, 6),
		getRedCard(7, 7),
		getRedCard(8, 8),
		getRedCard(9, 9),
		getRedCard(10, 10),
		getRedCard(11, 11),
		getRedCard(12, 12),
		getRedCard(13, 13),

		getYellowCard(14, 1),
		getYellowCard(15, 2),
		getYellowCard(16, 3),
		getYellowCard(17, 4),
		getYellowCard(18, 5),
		getYellowCard(19, 6),
		getYellowCard(20, 7),
		getYellowCard(21, 8),
		getYellowCard(22, 9),
		getYellowCard(23, 10),
		getYellowCard(24, 11),
		getYellowCard(25, 12),
		getYellowCard(26, 13),

		getBlueCard(27, 1),
		getBlueCard(28, 2),
		getBlueCard(29, 3),
		getBlueCard(30, 4),
		getBlueCard(31, 5),
		getBlueCard(32, 6),
		getBlueCard(33, 7),
		getBlueCard(34, 8),
		getBlueCard(35, 9),
		getBlueCard(36, 10),
		getBlueCard(37, 11),
		getBlueCard(38, 12),
		getBlueCard(39, 13),

		getBlackCard(40, 1),
		getBlackCard(41, 2),
		getBlackCard(42, 3),
		getBlackCard(43, 4),
		getBlackCard(44, 5),
		getBlackCard(45, 6),
		getBlackCard(46, 7),
		getBlackCard(47, 8),
		getBlackCard(48, 9),
		getBlackCard(49, 10),
		getBlackCard(50, 11),
		getBlackCard(51, 12),
		getBlackCard(52, 13),

		getEscapeCard(53),
		getEscapeCard(54),
		getEscapeCard(55),
		getEscapeCard(56),
		getEscapeCard(57),

		getPirateCard(58, 1),
		getPirateCard(59, 2),
		getPirateCard(60, 3),
		getPirateCard(61, 4),
		getPirateCard(62, 5),

		getMermaidCard(63),
		getMermaidCard(64),

		getScaryMaryCard(SCARY_MARY_ESCAPE_ID),
		getScaryMaryCard(SCARY_MARY_PIRATE_ID),

		getSkullKingCard(67),
	];
}

class DeckService {
	private deck: CardType[];

	constructor() {
		this.deck = buildDeck();
	}

	isScaryMaryCard(cardId: number): boolean {
		return [SCARY_MARY_ESCAPE_ID, SCARY_MARY_PIRATE_ID].includes(cardId);
	}

	getScaryMaryEscapeCardId(): number {
		return this.getCard(SCARY_MARY_ESCAPE_ID).id;
	}

	getScaryMaryPirateCardId(): number {
		return this.getCard(SCARY_MARY_PIRATE_ID).id;
	}

	getCard(id: number): CardType {
		return this.deck.find((card) => card.id === id)!;
	}
}

export default new DeckService();
