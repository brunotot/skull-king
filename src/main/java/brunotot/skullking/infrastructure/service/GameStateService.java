package brunotot.skullking.infrastructure.service;

import brunotot.skullking.domain.GameState;
import brunotot.skullking.web.dto.GameStateDto;

import java.util.Optional;

public interface GameStateService {
    void startGame(String id);
    GameStateDto findDtoById(String id);
    Optional<GameState> findById(String id);
    void executeAction(String gameId, Integer cardId);
}
