import { useContext, useState } from "react";
import { GameContext } from "../GameView";
import { useParams } from "react-router-dom";
import DeckService from "../../../../services/DeckService";
import GameStateService from "../../../../services/GameStateService";
import Card from "../../../common/Card";
import Dialog from "../../../ui/Dialog";
import { blue, red } from "@mui/material/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";
import "./../../../../assets/scss/PlayerHand.scss";
import {
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
} from "@mui/material";

export default function PlayerHand() {
	const params = useParams();
	const roomId = params.roomId as string;
	const { hand } = useContext(GameContext).gameState;

	async function handleCardSelect(cardId: number) {
		if (DeckService.isScaryMaryCard(cardId)) {
			setOpen(true);
			return;
		}
		await playCard(cardId);
	}

	async function playCard(cardId: number) {
		setOpen(false);
		await GameStateService.executeAction(roomId, cardId);
	}

	const [open, setOpen] = useState(false);

	const ScaryMaryDialog = (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			title="Escape or Pirate?"
		>
			<List sx={{ pt: 0 }}>
				<ListItem disableGutters>
					<ListItemButton
						onClick={() => playCard(DeckService.getScaryMaryEscapeCardId())}
					>
						<ListItemAvatar>
							<Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
								<FontAwesomeIcon icon={faFlag} />
							</Avatar>
						</ListItemAvatar>
						<ListItemText className="text-blue-600" primary="Escape" />
					</ListItemButton>
				</ListItem>
				<ListItem disableGutters>
					<ListItemButton
						onClick={() => playCard(DeckService.getScaryMaryPirateCardId())}
					>
						<ListItemAvatar>
							<Avatar sx={{ bgcolor: red[100], color: red[600] }}>
								<FontAwesomeIcon icon={faSkullCrossbones} />
							</Avatar>
						</ListItemAvatar>
						<ListItemText className="text-red-600" primary="Pirate" />
					</ListItemButton>
				</ListItem>
			</List>
		</Dialog>
	);

	return (
		<div className="player-hand">
			<div className="flex my-0 mx-auto">
				{ScaryMaryDialog}
				{hand.map((card, i) => (
					<Card
						key={i}
						onClick={() => handleCardSelect(card.id)}
						id={card.id}
						readonly={false}
					/>
				))}
			</div>
		</div>
	);
}
