package brunotot.skullking.domain.card;

import brunotot.skullking.domain.PointCardColor;
import lombok.Getter;

@Getter
public abstract class Card {
    private final Integer id;
    private final boolean special;
    private final PointCardColor color;

    protected Card(
            final Integer id,
            final boolean special,
            final PointCardColor color
    ) {
        this.id = id;
        this.special = special;
        this.color = color;
    }

    public boolean isColor() {
        return !this.special;
    }

    public boolean is(final Class<? extends Card> parentClass) {
        return parentClass.isAssignableFrom(this.getClass());
    }
}
