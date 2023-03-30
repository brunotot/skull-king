import Button from "../../../../ui/Button";
import {Round} from "../GameStats";
import GameStateService from "../../../../../services/GameStateService";
import {useContext} from "react";
import {GameContext} from "../../GameView";

export type ChooseWinnersActionProps = {
    round: Round;
}

export default function ChooseWinnersAction({ round }: ChooseWinnersActionProps) {
    const { gameState } = useContext(GameContext);
    const { id } = gameState;

    async function onExpectedWinnersChooseClick(expectedWinners: number) {
        await GameStateService.executeAction(id, expectedWinners);
    }

    return <div className="w-full h-full flex flex-col gap-4 items-center justify-center rotate-90">
        <div className="text-2xl font-bold text-white">
            Choose number of expected winners
        </div>
        <div className="flex flex-wrap gap-4 px-8 justify-center">
            {[...new Array(round + 1)].map((v, i) => (
                <Button
                    onClick={() => onExpectedWinnersChooseClick(i)}
                    classNameAppend="px-8 font-bold text-2xl"
                    tailwindColor="green"
                    text={i.toString()}
                    key={i}
                />
            ))}
        </div>
    </div>
}