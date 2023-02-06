package brunotot.skullking.domain.card.impl;

import brunotot.skullking.domain.card.subtype.SpecialCard;
import lombok.Getter;

@Getter
public class MermaidCard extends SpecialCard {
    public MermaidCard(final Integer id) {
        super(id);
    }

    @Override
    public String toString() {
        return "Mermaid";
    }
}
