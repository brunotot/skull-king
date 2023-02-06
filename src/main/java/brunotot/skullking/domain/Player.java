package brunotot.skullking.domain;

import brunotot.skullking.domain.card.Card;
import lombok.Getter;
import lombok.Setter;

import java.util.*;
import java.util.stream.Collectors;

@Getter
@Setter
public class Player {
    private String name;
    private List<Integer> cards;
    private Map<Integer, RoundData> stats;
    private Integer totalScore;

    public Player() {
        this(null);
    }

    public Player(final String name) {
        this.name = name;
        this.cards = new ArrayList<>();
        this.stats = new HashMap<>();
        this.totalScore = 0;
    }

    public List<Card> getCards() {
        return Deck.getCardIdsAsCards(this.cards);
    }

    public void dealCards(final List<Card> cards) {
        this.cards.clear();
        this.cards.addAll(Deck.getCardsAsIds(cards));
    }

    public void removeCard(final Integer cardId) {
        Objects.requireNonNull(cardId);
        var isScaryMary = cardId.equals(Deck.SCARY_MARY1_CARD_ID) || cardId.equals(Deck.SCARY_MARY2_CARD_ID);
        if (isScaryMary) {
            this.cards = this.cards.stream()
                    .filter(c -> !c.equals(Deck.SCARY_MARY1_CARD_ID) && !c.equals(Deck.SCARY_MARY2_CARD_ID))
                    .collect(Collectors.toList());
            return;
        }
        this.cards = this.cards.stream()
                .filter(c -> !cardId.equals(c))
                .collect(Collectors.toList());
    }

    public void appendWin(final Round round, final Integer bonus) {
        Deck.requireValidRound(round);
        var roundValue = round.getValue();
        this.getStats().get(roundValue).appendWin(bonus);
    }
}
