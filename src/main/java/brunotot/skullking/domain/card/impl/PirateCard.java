package brunotot.skullking.domain.card.impl;

import brunotot.skullking.domain.card.subtype.SpecialCard;
import lombok.Getter;

@Getter
public class PirateCard extends SpecialCard {
    public PirateCard(final Integer id) {
        super(id);
    }

    @Override
    public String toString() {
        return "Pirate";
    }
}
