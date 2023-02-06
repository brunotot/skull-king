package brunotot.skullking.infrastructure.service.impl;

import brunotot.skullking.domain.GameState;
import brunotot.skullking.domain.SocketEvent;
import brunotot.skullking.infrastructure.repository.GameStateRepository;
import brunotot.skullking.infrastructure.repository.LobbyRoomRepository;
import brunotot.skullking.infrastructure.service.GameStateService;
import brunotot.skullking.infrastructure.service.SocketService;
import brunotot.skullking.infrastructure.utils.SecurityContextUtils;
import brunotot.skullking.web.converter.impl.GameStateConverter;
import brunotot.skullking.web.dto.GameStateDto;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GameStateServiceImpl implements GameStateService {
    private final LobbyRoomRepository roomRepository;
    private final GameStateRepository gameStateRepository;
    private final SocketService socketService;
    private final GameStateConverter gameStateConverter;

    public GameStateServiceImpl(
            final LobbyRoomRepository roomRepository,
            final GameStateRepository gameStateRepository,
            final SocketService socketService,
            final GameStateConverter gameStateConverter
    ) {
        this.roomRepository = roomRepository;
        this.gameStateRepository = gameStateRepository;
        this.socketService = socketService;
        this.gameStateConverter = gameStateConverter;
    }

    @Override
    public void startGame(final String id) {
        var room = this.roomRepository.findById(id).orElseThrow();
        var playerNames = room.getPlayerNames();
        this.roomRepository.deleteById(id);
        var gameStateInitial = new GameState(id, playerNames);
        this.gameStateRepository.save(gameStateInitial);
        this.socketService.sendToApp(SocketEvent.START_GAME, id);
    }

    @Override
    public GameStateDto findDtoById(final String id) {
        return this.findById(id)
                .map(gameState -> this.gameStateConverter.toDto(
                        gameState,
                        SecurityContextUtils.getUsername())
                ).orElseThrow();
    }

    @Override
    public Optional<GameState> findById(final String id) {
        return this.gameStateRepository.findById(id);
    }

    @Override
    public void executeAction(final String gameId, final Integer cardId) {
        var optional = this.findById(gameId);
        if (optional.isEmpty()) {
            throw new RuntimeException("Game does not exist.");
        }
        var game = optional.get();
        game.executeTurn(cardId);
        this.gameStateRepository.save(game);

        game.getPlayers().forEach(player -> {
            var username = player.getName();
            var gameStateDto = this.gameStateConverter.toDto(game, username);
            this.socketService.sendToUser(SocketEvent.UPDATE_GAME, gameStateDto, username);
        });

    }
}
