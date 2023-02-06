package brunotot.skullking.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Document("lobby")
@Getter
@Setter
@NoArgsConstructor
public class LobbyRoom {
    @Id
    private String id;
    private String owner;
    private List<String> playerNames;

    public LobbyRoom(final String roomOwnerName) {
        this.playerNames = new ArrayList<>();
        this.playerNames.add(roomOwnerName);
        this.owner = roomOwnerName;
    }

    public void addPlayer(final String playerName) {
        this.playerNames.add(playerName);
    }

    public void removePlayer(final String username) {
        this.playerNames = this.playerNames.stream()
                .filter(u -> !u.equals(username))
                .collect(Collectors.toList());
    }

    public Integer playerCount() {
        return this.playerNames.size();
    }

    public boolean isPlayerPresent(final String username) {
        return this.playerNames.stream().anyMatch(u -> u.equals(username));
    }
}
