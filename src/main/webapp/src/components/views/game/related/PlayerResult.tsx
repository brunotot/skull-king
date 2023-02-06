import goldMedal from "./../../../../assets/svg/medal-gold.svg";
import silverMedal from "./../../../../assets/svg/medal-silver.svg";
import bronzeMedal from "./../../../../assets/svg/medal-bronze.svg";

export type PlacementType = 1 | 2 | 3 | 4 | 5 | 6;

export type PlayerResultProps = {
	player: string;
	placement: PlacementType;
	points: number;
};

export const MEDAL_SVG = {
	1: goldMedal,
	2: silverMedal,
	3: bronzeMedal,
	4: undefined,
	5: undefined,
	6: undefined,
};

export default function PlayerResult({
	player,
	placement,
	points,
}: PlayerResultProps) {
	const hasMedal = placement <= 3;
	return (
		<div className="flex gap-2 items-center font-bold text-white">
			{hasMedal && (
				<img className={`w-[${6 - placement}em]`} src={MEDAL_SVG[placement]} />
			)}
			<span className="text-2xl">
				{placement}.&nbsp;{player}&nbsp;({points})
			</span>
		</div>
	);
}
