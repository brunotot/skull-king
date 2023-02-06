package brunotot.skullking.web.controller;

import brunotot.skullking.infrastructure.service.GameStateService;
import brunotot.skullking.web.dto.GameStateDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/game/{gameId}")
public class GameStateController {
    private final GameStateService gameStateService;

    public GameStateController(final GameStateService gameStateService) {
        this.gameStateService = gameStateService;
    }

    @GetMapping
    @PreAuthorize("@gameStateValidatorService.validateGetGameState(#gameId)")
    public ResponseEntity<GameStateDto> getGameState(final @PathVariable String gameId) {
        return ResponseEntity.ok(this.gameStateService.findDtoById(gameId));
    }

    @PostMapping("/start")
    @PreAuthorize("@gameStateValidatorService.validateStartGame(#gameId)")
    public ResponseEntity<Void> startGame(final @PathVariable String gameId) {
        this.gameStateService.startGame(gameId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/play-card/{cardId}")
    @PreAuthorize("@gameStateValidatorService.validateExecuteAction(#gameId, #cardId)")
    public ResponseEntity<Void> executeAction(
            final @PathVariable String gameId,
            final @PathVariable Integer cardId
    ) {
        this.gameStateService.executeAction(gameId, cardId);
        return ResponseEntity.noContent().build();
    }
}
