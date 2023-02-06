package brunotot.skullking.web.validator.preauthorize;

import brunotot.skullking.infrastructure.service.LobbyRoomService;
import brunotot.skullking.infrastructure.utils.SecurityContextUtils;
import org.springframework.stereotype.Service;

@Service("roomValidatorService")
public record RoomValidatorService(LobbyRoomService lobbyRoomService) {

    public boolean userNotAlreadyRoomOwner() {
        var user = SecurityContextUtils.getCurrentUser();
        return this.lobbyRoomService.findRoomByOwner(user.getUsername()).isEmpty();
    }

}
