package brunotot.skullking.domain.card.impl;

import brunotot.skullking.domain.PointCardColor;
import brunotot.skullking.domain.card.subtype.PointCard;
import lombok.Getter;

@Getter
public class BlueCard extends PointCard {
    public BlueCard(final Integer id, final Integer points) {
        super(id, PointCardColor.BLUE, points);
    }

    @Override
    public String toString() {
        return String.format("Blue %d", this.getPoints());
    }
}
