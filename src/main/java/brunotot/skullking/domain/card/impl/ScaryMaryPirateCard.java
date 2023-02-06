package brunotot.skullking.domain.card.impl;

import lombok.Getter;

@Getter
public class ScaryMaryPirateCard extends PirateCard {
    public ScaryMaryPirateCard(final Integer id) {
        super(id);
    }

    @Override
    public String toString() {
        return "Scary Mary - Pirate";
    }
}
