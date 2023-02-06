package brunotot.skullking.domain.card.impl;

import brunotot.skullking.domain.PointCardColor;
import brunotot.skullking.domain.card.subtype.PointCard;
import lombok.Getter;

@Getter
public class BlackCard extends PointCard {
    public BlackCard(final Integer id, final Integer points) {
        super(id, PointCardColor.BLACK, points);
    }

    @Override
    public String toString() {
        return String.format("Black %d", this.getPoints());
    }
}
