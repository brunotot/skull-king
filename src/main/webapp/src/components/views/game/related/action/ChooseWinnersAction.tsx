import { Round } from "../GameStats";
import GameStateService from "../../../../../services/GameStateService";
import { useContext, useState } from "react";
import { GameContext } from "../../GameView";
import { Box } from "@mui/system";
import { Button, Slider } from "@mui/material";

export type ChooseWinnersActionProps = {
	round: Round;
};

export default function ChooseWinnersAction({
	round,
}: ChooseWinnersActionProps) {
	const [value, setValue] = useState<number>(0);
	const { gameState } = useContext(GameContext);
	const { id } = gameState;
	const marks = [...new Array(round + 1)].map((v, i) => ({
		value: i,
		label: i.toString(),
	}));

	const handleSliderChange = (event: Event, newValue: number | number[]) => {
		setValue(newValue as number);
	};

	async function submit() {
		await GameStateService.executeAction(id, value);
	}

	return (
		<div className="w-[98cqi] h-full flex flex-col gap-4 items-center justify-center">
			<div className="font-bold text-white mb-4">
				Choose number of expected winners
			</div>
			<div className="flex flex-col gap-4">
				<Box width="100%" sx={{ width: "80cqi" }}>
					<Slider
						aria-label="Always visible"
						step={1}
						marks={marks}
						valueLabelDisplay="on"
						max={round}
						color="primary"
						value={value}
						onChange={handleSliderChange}
					/>
				</Box>
				<div>
					<Button onClick={() => submit()} variant="contained">
						Confirm ({value})
					</Button>
				</div>
			</div>
		</div>
	);
}
