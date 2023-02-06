package brunotot.skullking.domain.card.impl;

import brunotot.skullking.domain.card.subtype.SpecialCard;
import lombok.Getter;

@Getter
public class SkullKingCard extends SpecialCard {
    public SkullKingCard(final Integer id) {
        super(id);
    }

    @Override
    public String toString() {
        return "Skull King";
    }
}
