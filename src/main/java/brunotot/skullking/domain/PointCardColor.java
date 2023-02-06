package brunotot.skullking.domain;

import brunotot.skullking.domain.card.impl.BlackCard;
import brunotot.skullking.domain.card.impl.BlueCard;
import brunotot.skullking.domain.card.impl.RedCard;
import brunotot.skullking.domain.card.impl.YellowCard;
import brunotot.skullking.domain.card.subtype.PointCard;

public enum PointCardColor {
    YELLOW(YellowCard.class),
    RED(RedCard.class),
    BLUE(BlueCard.class),
    BLACK(BlackCard.class);

    private final Class<? extends PointCard> cardClass;

    PointCardColor(final Class<? extends PointCard> cardClass) {
        this.cardClass = cardClass;
    }

    public Class<? extends PointCard> getCardClass() {
        return this.cardClass;
    }
}
