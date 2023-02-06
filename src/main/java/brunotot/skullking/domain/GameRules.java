package brunotot.skullking.domain;

import brunotot.skullking.domain.card.Card;
import brunotot.skullking.domain.card.impl.BlackCard;
import brunotot.skullking.domain.card.impl.MermaidCard;
import brunotot.skullking.domain.card.impl.PirateCard;
import brunotot.skullking.domain.card.impl.SkullKingCard;
import brunotot.skullking.domain.card.subtype.PointCard;
import brunotot.skullking.domain.helper.CardStreamHelper;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

public class GameRules {
    private static final Object NULL = null;

    private final CardStreamHelper<Card> actionCardStreamHelper;
    private final Map<String, List<Card>> playerHands;
    private final PointCardColor definedColor;

    public GameRules(final GameState gameState) {
        var actionCards = gameState.getActionCards();
        this.actionCardStreamHelper = new CardStreamHelper<>(actionCards);
        this.definedColor = GameRules.buildDefinedColor(actionCards);
        this.playerHands = gameState.getPlayers().stream().collect(Collectors.toMap(
                Player::getName,
                Player::getCards
        ));
    }
    
    public List<Card> getValidResponseCards(final String player) {
        return Optional.ofNullable(this.definedColor)
                .filter(color -> this.handContainsColor(player, color))
                .map(color -> this.getSpecialOrCorrespondingColorCards(player, color))
                .orElse(this.playerHands.get(player));
    }

    public Card getStrongestPlayedCard() {
        return of(this.getIfStrongestCardType(SkullKingCard.class, getSkullKingValidMapper()))
                .or(() -> of(this.getIfStrongestCardType(MermaidCard.class, getMermaidCardValidMapper())))
                .or(() -> of(this.getIfStrongestCardType(PirateCard.class, getPirateCardValidMapper())))
                .or(() -> of(this.getIfStrongestCardType(BlackCard.class, getBlackCardValidMapper())))
                .or(() -> of(this.getIfStrongestCardType(PointCard.class, this.getPointCardValidMapper())))
                .orElseGet(this::getFirstPlayedCard);
    }

    private Function<SkullKingCard, Boolean> getSkullKingValidMapper() {
        return (card) -> this.actionCardStreamHelper.none(MermaidCard.class);
    }

    private Function<MermaidCard, Boolean> getMermaidCardValidMapper() {
        return (card) -> this.actionCardStreamHelper.any(SkullKingCard.class) || this.actionCardStreamHelper.none(PirateCard.class);
    }

    private Function<PirateCard, Boolean> getPirateCardValidMapper() {
        return (card) -> this.actionCardStreamHelper.none(SkullKingCard.class);
    }

    private Function<BlackCard, Boolean> getBlackCardValidMapper() {
        return (card) -> this.actionCardStreamHelper.none(SkullKingCard.class, PirateCard.class, MermaidCard.class)
                && this.actionCardStreamHelper.filter(BlackCard.class).none(c -> c.getPoints() > card.getPoints());
    }

    private Function<PointCard, Boolean> getPointCardValidMapper() {
        return (card) -> Objects.nonNull(this.definedColor)
                && this.actionCardStreamHelper.none(SkullKingCard.class, PirateCard.class, MermaidCard.class)
                && this.actionCardStreamHelper.filter(this.definedColor.getCardClass())
                    .none(c -> c.getPoints() > card.getPoints());
    }

    private boolean filterBySpecialOrDefinedColor(final Card card, final PointCardColor color) {
        return Optional.of(card)
                .map(c -> c.isSpecial() || c.getColor().equals(color))
                .orElseThrow();
    }

    private boolean handContainsColor(final String player, final PointCardColor color) {
        return this.playerHands.get(player).stream().anyMatch(card -> color.equals(card.getColor()));
    }

    private List<Card> getSpecialOrCorrespondingColorCards(final String player, final PointCardColor correspondingColor) {
        return this.playerHands.get(player).stream()
                .filter(card -> this.filterBySpecialOrDefinedColor(card, correspondingColor))
                .collect(Collectors.toList());
    }

    @SuppressWarnings("unchecked")
    private <T extends Card> Card getIfStrongestCardType(final Class<T> cardType, final Function<T, Boolean> onlyIf) {
        return this.getActionCards().stream()
                .filter(card -> cardType.isAssignableFrom(card.getClass()) && onlyIf.apply((T) card))
                .findFirst()
                .orElse((Card) NULL);
    }
    
    private List<Card> getActionCards() {
        return this.actionCardStreamHelper.get();
    }

    private Card getFirstPlayedCard() {
        return this.getActionCards().stream()
                .findFirst()
                .orElse((Card) NULL);
    }

    private static Optional<Card> of(final Card card) {
        return Optional.ofNullable(card);
    }

    private static PointCardColor buildDefinedColor(final List<Card> cards) {
        return cards.stream()
                .filter(Card::isColor)
                .findFirst()
                .map(Card::getColor)
                .orElse((PointCardColor) NULL);
    }
}
