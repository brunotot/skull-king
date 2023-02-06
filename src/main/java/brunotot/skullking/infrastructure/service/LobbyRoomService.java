package brunotot.skullking.infrastructure.service;

import brunotot.skullking.domain.LobbyRoom;

import java.util.List;
import java.util.Optional;

public interface LobbyRoomService {
    List<LobbyRoom> findAll();
    LobbyRoom create();
    LobbyRoom enter(String id);
    LobbyRoom findById(String gameId);
    Optional<LobbyRoom> findRoomByOwner(String owner);
    void leave(String id);
}
