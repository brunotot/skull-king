package brunotot.skullking.infrastructure.service.impl;

import brunotot.skullking.domain.LobbyRoom;
import brunotot.skullking.domain.SocketEvent;
import brunotot.skullking.infrastructure.repository.LobbyRoomRepository;
import brunotot.skullking.infrastructure.service.LobbyRoomService;
import brunotot.skullking.infrastructure.utils.SecurityContextUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LobbyRoomServiceImpl implements LobbyRoomService {
    private final LobbyRoomRepository lobbyRoomRepository;
    private final SocketServiceImpl socketService;

    public LobbyRoomServiceImpl(
            final LobbyRoomRepository lobbyRoomRepository,
            final SocketServiceImpl socketService
    ) {
        this.lobbyRoomRepository = lobbyRoomRepository;
        this.socketService = socketService;
    }

    @Override
    public List<LobbyRoom> findAll() {
        return this.lobbyRoomRepository.findAll();
    }

    @Override
    public LobbyRoom create() {
        var username = SecurityContextUtils.getCurrentUser().getUsername();

        Optional.ofNullable(this.lobbyRoomRepository.findRoomByParticipant(username))
                .ifPresent(r -> this.leave(r.getId()));

        var createdRoom = this.lobbyRoomRepository.save(new LobbyRoom(username));
        this.socketService.sendToApp(SocketEvent.CREATE_ROOM, createdRoom);
        return createdRoom;
    }

    @Override
    public LobbyRoom enter(final String id) {
        var username = SecurityContextUtils.getCurrentUser().getUsername();
        return this.lobbyRoomRepository.findById(id)
                .map(room -> {
                    leavePreviousRoomIfExists(username, room.getId());
                    room.addPlayer(username);
                    var updatedRoom = this.lobbyRoomRepository.save(room);
                    this.socketService.sendToApp(SocketEvent.UPDATE_ROOM, updatedRoom);
                    this.socketService.sendToApp(SocketEvent.ENTER_ROOM, updatedRoom);
                    return updatedRoom;
                }).orElseThrow();
    }

    @Override
    public LobbyRoom findById(final String id) {
        return this.lobbyRoomRepository.findById(id)
                .orElse(null);
    }

    @Override
    public Optional<LobbyRoom> findRoomByOwner(final String owner) {
        return Optional.ofNullable(this.lobbyRoomRepository.findRoomByOwner(owner));
    }

    @Override
    public void leave(final String id) {
        this.lobbyRoomRepository.findById(id).ifPresent(room -> {
            var currentUser = SecurityContextUtils.getCurrentUser();
            var currentUsername = currentUser.getUsername();
            var roomOwner = room.getOwner();
            var roomId = room.getId();
            if (currentUsername.equals(roomOwner)) {
                this.lobbyRoomRepository.deleteById(roomId);
                this.socketService.sendToApp(SocketEvent.DELETE_ROOM, roomId);
            } else {
                room.removePlayer(currentUsername);
                this.lobbyRoomRepository.save(room);
                this.socketService.sendToApp(SocketEvent.UPDATE_ROOM, room);
            }
        });
    }

    private void leavePreviousRoomIfExists(final String username, final String currentRoomId) {
        Optional.ofNullable(this.lobbyRoomRepository.findRoomByParticipant(username))
                .ifPresent(prevRoom -> {
                    var prevRoomId = prevRoom.getId();
                    if (!prevRoomId.equals(currentRoomId)) {
                        this.leave(prevRoomId);
                    } else {
                        throw new RuntimeException("Unable to enter room in which you are already in");
                    }
                });
    }
}
