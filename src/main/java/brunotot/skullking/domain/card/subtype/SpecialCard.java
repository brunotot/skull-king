package brunotot.skullking.domain.card.subtype;

import brunotot.skullking.domain.card.Card;
import lombok.Getter;

@Getter
public abstract class SpecialCard extends Card {
    protected SpecialCard(final Integer id) {
        super(id, true, null);
    }
}
