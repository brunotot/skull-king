package brunotot.skullking.web.converter.impl;

import brunotot.skullking.domain.Deck;
import brunotot.skullking.domain.GameState;
import brunotot.skullking.web.converter.Converter;
import brunotot.skullking.web.dto.GameStateDto;
import org.springframework.stereotype.Component;

@Component
public class GameStateConverter implements Converter<GameState, GameStateDto> {
    public GameStateDto toDto(final GameState gameState, final String player) {
        return GameStateDto.builder()
                .validResponseCardIds(gameState.getValidResponseCardIds(player))
                .hand(Deck.sortCards(gameState.getPlayer(player).getCards()))
                .currentPlayer(gameState.getCurrentPlayerName())
                .round(gameState.getRound().getValue())
                .playedCards(gameState.getActions())
                .stats(gameState.getPlayerStats())
                .order(gameState.getOrder())
                .phase(gameState.getPhase())
                .owner(gameState.getOwner())
                .id(gameState.getId())
                .strongestCardId(gameState.getStrongestActionCardId())
                .build();
    }
}
