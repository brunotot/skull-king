package brunotot.skullking.domain;

import lombok.Getter;

@Getter
public class CardAction {
    private final String playerName;
    private final Integer value;

    public CardAction(final String playerName, final Integer value) {
        this.playerName = playerName;
        this.value = value;
    }
}
