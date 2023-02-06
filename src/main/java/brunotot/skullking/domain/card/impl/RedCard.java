package brunotot.skullking.domain.card.impl;

import brunotot.skullking.domain.PointCardColor;
import brunotot.skullking.domain.card.subtype.PointCard;
import lombok.Getter;

@Getter
public class RedCard extends PointCard {
    public RedCard(final Integer id, final Integer points) {
        super(id, PointCardColor.RED, points);
    }

    @Override
    public String toString() {
        return String.format("Red %d", this.getPoints());
    }
}
