package brunotot.skullking.domain.card.subtype;

import brunotot.skullking.domain.PointCardColor;
import brunotot.skullking.domain.card.Card;
import lombok.Getter;

@Getter
public abstract class PointCard extends Card {
    private final PointCardColor color;
    private final Integer points;

    protected PointCard(
            final Integer id,
            final PointCardColor color,
            final Integer points
    ) {
        super(id, false, color);
        this.color = color;
        this.points = points;
    }
}
