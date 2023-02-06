package brunotot.skullking.domain.helper;

import brunotot.skullking.domain.card.Card;

import java.util.Arrays;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public record CardStreamHelper<T extends Card>(List<T> cards) {
    public List<T> get() {
        return this.cards;
    }

    @SafeVarargs
    public final boolean any(final Class<? extends Card>... cardClasses) {
        return this.cards.stream().anyMatch(c -> Arrays.stream(cardClasses).allMatch(c::is));
    }

    @SafeVarargs
    public final boolean none(final Class<? extends Card>... cardClasses) {
        return this.cards.stream().noneMatch(c -> Arrays.stream(cardClasses).allMatch(c::is));
    }

    public boolean any(final Predicate<T> predicate) {
        return this.cards.stream().anyMatch(predicate);
    }

    public boolean none(final Predicate<T> predicate) {
        return this.cards.stream().noneMatch(predicate);
    }

    @SuppressWarnings("unchecked")
    public <K extends Card> CardStreamHelper<K> filter(final Class<K> cardClass) {
        return new CardStreamHelper<>(this.cards.stream()
                .filter(c -> c.is(cardClass))
                .map(c -> (K) c)
                .collect(Collectors.toList()));
    }
}
