package brunotot.skullking.web.controller;

import brunotot.skullking.domain.LobbyRoom;
import brunotot.skullking.infrastructure.service.LobbyRoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/room")
public class LobbyController {
    private final LobbyRoomService lobbyRoomService;

    public LobbyController(final LobbyRoomService lobbyRoomService) {
        this.lobbyRoomService = lobbyRoomService;
    }

    @GetMapping
    public List<LobbyRoom> findAll() {
        return this.lobbyRoomService.findAll();
    }

    @PostMapping
    @PreAuthorize("@roomValidatorService.userNotAlreadyRoomOwner()")
    public ResponseEntity<LobbyRoom> createRoom() {
        return ResponseEntity.ok(this.lobbyRoomService.create());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LobbyRoom> findById(final @PathVariable String id) {
        return ResponseEntity.ok(this.lobbyRoomService.findById(id));
    }

    @PostMapping("/{id}")
    public ResponseEntity<LobbyRoom> enterRoom(final @PathVariable String id) {
        return ResponseEntity.ok(this.lobbyRoomService.enter(id));
    }

    @PostMapping("/{id}/leave")
    public ResponseEntity<Void> leaveRoom(final @PathVariable String id) {
        this.lobbyRoomService.leave(id);
        return ResponseEntity.noContent().build();
    }
}
