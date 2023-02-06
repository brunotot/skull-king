package brunotot.skullking.domain.card.impl;

import brunotot.skullking.domain.PointCardColor;
import brunotot.skullking.domain.card.subtype.PointCard;
import lombok.Getter;

@Getter
public class YellowCard extends PointCard {
    public YellowCard(final Integer id, final Integer points) {
        super(id, PointCardColor.YELLOW, points);
    }

    @Override
    public String toString() {
        return String.format("Yellow %d", this.getPoints());
    }
}
