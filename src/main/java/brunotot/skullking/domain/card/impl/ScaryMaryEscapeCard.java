package brunotot.skullking.domain.card.impl;

import lombok.Getter;

@Getter
public class ScaryMaryEscapeCard extends EscapeCard {
    public ScaryMaryEscapeCard(final Integer id) {
        super(id);
    }

    @Override
    public String toString() {
        return "Scary Mary - Escape";
    }
}
