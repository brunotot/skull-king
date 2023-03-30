import React, {useContext} from "react";
import {Avatar, Chip} from "@mui/material";
import DeckService from "../../../services/DeckService";
import Card from "../../common/Card";
import Loader from "../../ui/Loader";
import ChooseWinnersAction from "./related/action/ChooseWinnersAction";
import AuthService from "../../../services/AuthService";
import {GameContext} from "./GameView";

type PlayersCount = 2 | 3 | 4 | 5 | 6;

const MAP = {
    2: [1, 4],
    3: [1, 3, 5],
    4: [1, 3, 4, 5],
    5: [1, 2, 3, 4, 5],
    6: [1, 2, 3, 4, 5, 6]
}

function shiftPlayersToStartFromCurrent(
    players: string[],
    current: string
): string[] {
    const currentIndex = players.indexOf(current);
    return [...players.slice(currentIndex), ...players.slice(0, currentIndex)];
}

interface Props {
    players?: string[];
    render: (player: string) => React.ReactNode
}

const Shape: React.FC<Props> = ({ players: playersNullable, render }) => {
    const { gameState } = useContext(GameContext);
    const players = playersNullable ? playersNullable : shiftPlayersToStartFromCurrent(
        gameState.order,
        AuthService.username
    );
    const length = players.length as PlayersCount;

    return <div className="hexagon" data-players={players}>
        <div/>
        <div/>
        <div/>
        {MAP[length].map((value, i) => {
            const RenderedComponent = render(players[i]);
            return <div key={players[i]} className="player" data-number={value}>
                <div className="player-avatar" />
                <div className="player-name">{players[i]}</div>
                <div className="after">
                    {/*<Card
                        className="w-[18cqi] rotate-[90deg]"
                        card={DeckService.getCard(30)}
                        isFromPlayground={true}
                    />*/}
                    {/*<Loader />*/}
                    {RenderedComponent}
                </div>
            </div>
        })}
    </div>;
};

export default Shape;
