package brunotot.skullking.web.validator.preauthorize;

import brunotot.skullking.infrastructure.service.GameStateService;
import brunotot.skullking.infrastructure.service.LobbyRoomService;
import brunotot.skullking.infrastructure.utils.SecurityContextUtils;
import org.springframework.stereotype.Service;

@Service("gameStateValidatorService")
public record GameStateValidatorService(LobbyRoomService lobbyRoomService, GameStateService gameStateService) {
    private static final Integer MIN_PLAYER_COUNT = 2;
    private static final Integer MAX_PLAYER_COUNT = 6;

    public boolean validateStartGame(final String id) {
        return this.lobbyRoomService.findRoomByOwner(SecurityContextUtils.getUsername())
                .map(room -> room.getId().equals(id)
                        && room.playerCount() >= MIN_PLAYER_COUNT
                        && room.playerCount() <= MAX_PLAYER_COUNT
                ).orElse(Boolean.FALSE);
    }

    public boolean validateGetGameState(final String id) {
        return this.gameStateService.findById(id)
                .map(r -> r.playerExists(SecurityContextUtils.getUsername()))
                .orElse(Boolean.FALSE);
    }

    public boolean validateExecuteAction(final String gameId, final Integer cardId) {
        var username = SecurityContextUtils.getUsername();
        return true;
    }
}
