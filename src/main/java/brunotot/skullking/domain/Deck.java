package brunotot.skullking.domain;

import brunotot.skullking.domain.card.Card;
import brunotot.skullking.domain.card.impl.*;
import brunotot.skullking.domain.card.subtype.PointCard;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;

public final class Deck {
    public static final Integer SCARY_MARY1_CARD_ID = 65;
    public static final Integer SCARY_MARY2_CARD_ID = 66;

    private static final List<Card> CARDS = Deck.buildCards();
    private static final Integer MIN_CARD_ID = Deck.getLowestCardId();
    private static final Integer MAX_CARD_ID = Deck.getHighestCardId();
    private static final String INVALID_MIN_ROUND_MSG_FORMAT = "Minimum allowed round can be %d";
    private static final String INVALID_MAX_ROUND_MSG_FORMAT = "Minimum allowed round can be %d";
    private static final String INVALID_CARD_ID_MSG_FORMAT =
            "Card ID must be better than %d and smaller than %d but received %d";

    private Deck() {
        // NOOP
    }

    public static List<Integer> getCardsAsIds(final List<Card> cardList) {
        Deck.requireValidCards(cardList);
        return cardList.stream().map(Card::getId).toList();
    }

    public static List<Card> getCardIdsAsCards(final List<Integer> cardIdList) {
        var cardList = cardIdList.stream().map(Deck::getCard).toList();
        Deck.requireValidCards(cardList);
        return cardList;
    }

    public static void dealCards(final Integer round, final List<Player> playerList) {
        Deck.requireValidRound(round);
        Deck.requireValidPlayerList(playerList);
        List<Card> cardsCopy = Deck.getShuffledCards();
        var i = 0;
        for (final Player player : playerList) {
            var fromIndex = i * round;
            var toIndex = fromIndex + round;
            var cards = cardsCopy.subList(fromIndex, toIndex);
            player.dealCards(cards);
            i++;
        }
    }

    public static Card getCard(final Integer cardId) {
        Deck.validateCardId(cardId);
        return Deck.CARDS.stream()
                .filter(card -> Objects.equals(cardId, card.getId()))
                .findFirst()
                .orElseThrow();
    }

    public static List<Card> sortCards(final List<Card> cardList) {
        Deck.requireValidCards(cardList);
        return cardList.stream().sorted((c1, c2) -> {
            final Function<Class<? extends Card>, Integer> getCardOrder = cardClass -> {
                var is1CardClass = c1.is(cardClass);
                var is2CardClass = c2.is(cardClass);
                if (!is1CardClass && is2CardClass) {
                    return 1;
                }
                if (is1CardClass && !is2CardClass) {
                    return -1;
                }
                return 0;
            };

            var escapeOrderBySpecificType = getCardOrder.apply(EscapeCard.class);
            if (escapeOrderBySpecificType != 0) return escapeOrderBySpecificType;

            var yellowOrderBySpecificType = getCardOrder.apply(YellowCard.class);
            if (yellowOrderBySpecificType != 0) return yellowOrderBySpecificType;

            var redOrderBySpecificType = getCardOrder.apply(RedCard.class);
            if (redOrderBySpecificType != 0) return redOrderBySpecificType;

            var blueOrderBySpecificType = getCardOrder.apply(BlueCard.class);
            if (blueOrderBySpecificType != 0) return blueOrderBySpecificType;

            var blackOrderBySpecificType = getCardOrder.apply(BlackCard.class);
            if (blackOrderBySpecificType != 0) return blackOrderBySpecificType;

            var mermaidOrderBySpecificType = getCardOrder.apply(MermaidCard.class);
            if (mermaidOrderBySpecificType != 0) return blackOrderBySpecificType;

            var pirateOrderBySpecificType = getCardOrder.apply(PirateCard.class);
            if (pirateOrderBySpecificType != 0) return pirateOrderBySpecificType;

            var scaryMaryEscapeOrderBySpecificType = getCardOrder.apply(ScaryMaryEscapeCard.class);
            if (scaryMaryEscapeOrderBySpecificType != 0) return scaryMaryEscapeOrderBySpecificType;

            var scaryMaryPirateOrderBySpecificType = getCardOrder.apply(ScaryMaryPirateCard.class);
            if (scaryMaryPirateOrderBySpecificType != 0) return scaryMaryPirateOrderBySpecificType;

            var skullKingOrderBySpecificType = getCardOrder.apply(SkullKingCard.class);
            if (skullKingOrderBySpecificType != 0) return skullKingOrderBySpecificType;

            if (c1.is(PointCard.class) && c2.is(PointCard.class)) {
                return ((PointCard) c1).getPoints() - ((PointCard) c2).getPoints();
            }

            return 0;
        }).collect(Collectors.toList());
    }

    public static void requireValidRound(final Round round) {
        Objects.requireNonNull(round);
        Deck.requireValidRound(round.getValue());
    }

    private static void validateCardId(final Integer cardId) {
        Objects.requireNonNull(cardId);
        if (MIN_CARD_ID >= cardId && MAX_CARD_ID <= cardId) {
            throw new IllegalArgumentException(String.format(
                    INVALID_CARD_ID_MSG_FORMAT,
                    MIN_CARD_ID,
                    MAX_CARD_ID,
                    cardId
            ));
        }
    }

    private static Integer getHighestCardId() {
        return Deck.CARDS.stream()
                .map(Card::getId)
                .max(Integer::compareTo)
                .orElseThrow();
    }

    private static Integer getLowestCardId() {
        return Deck.CARDS.stream()
                .map(Card::getId)
                .min(Integer::compareTo)
                .orElseThrow();
    }

    private static void requireValidCards(final List<Card> cardList) {
        Objects.requireNonNull(cardList);
        cardList.forEach(Objects::requireNonNull);
    }

    private static void requireValidPlayerList(final List<Player> playerList) {
        Objects.requireNonNull(playerList);
        playerList.forEach(Objects::requireNonNull);
    }

    private static void requireValidRound(final Integer round) {
        Objects.requireNonNull(round);
        if (round > Round.MAX_ROUND_VALUE) {
            throw new IllegalArgumentException(String.format(
                    INVALID_MAX_ROUND_MSG_FORMAT,
                    Round.MAX_ROUND_VALUE
            ));
        }
        if (round < Round.MIN_ROUND_VALUE) {
            throw new IllegalArgumentException(String.format(
                    INVALID_MIN_ROUND_MSG_FORMAT,
                    Round.MIN_ROUND_VALUE
            ));
        }
    }

    private static List<Card> getShuffledCards() {
        List<Card> cardsCopy = new ArrayList<>(Deck.CARDS).stream()
                .filter(c -> !c.getId().equals(SCARY_MARY1_CARD_ID))
                .collect(Collectors.toList());
        Collections.shuffle(cardsCopy);
        return cardsCopy;
    }

    private static List<Card> buildCards() {
        return List.of(
                new RedCard(1, 1),
                new RedCard(2, 2),
                new RedCard(3, 3),
                new RedCard(4, 4),
                new RedCard(5, 5),
                new RedCard(6, 6),
                new RedCard(7, 7),
                new RedCard(8, 8),
                new RedCard(9, 9),
                new RedCard(10, 10),
                new RedCard(11, 11),
                new RedCard(12, 12),
                new RedCard(13, 13),
                new YellowCard(14, 1),
                new YellowCard(15, 2),
                new YellowCard(16, 3),
                new YellowCard(17, 4),
                new YellowCard(18, 5),
                new YellowCard(19, 6),
                new YellowCard(20, 7),
                new YellowCard(21, 8),
                new YellowCard(22, 9),
                new YellowCard(23, 10),
                new YellowCard(24, 11),
                new YellowCard(25, 12),
                new YellowCard(26, 13),
                new BlueCard(27, 1),
                new BlueCard(28, 2),
                new BlueCard(29, 3),
                new BlueCard(30, 4),
                new BlueCard(31, 5),
                new BlueCard(32, 6),
                new BlueCard(33, 7),
                new BlueCard(34, 8),
                new BlueCard(35, 9),
                new BlueCard(36, 10),
                new BlueCard(37, 11),
                new BlueCard(38, 12),
                new BlueCard(39, 13),
                new BlackCard(40, 1),
                new BlackCard(41, 2),
                new BlackCard(42, 3),
                new BlackCard(43, 4),
                new BlackCard(44, 5),
                new BlackCard(45, 6),
                new BlackCard(46, 7),
                new BlackCard(47, 8),
                new BlackCard(48, 9),
                new BlackCard(49, 10),
                new BlackCard(50, 11),
                new BlackCard(51, 12),
                new BlackCard(52, 13),
                new EscapeCard(53),
                new EscapeCard(54),
                new EscapeCard(55),
                new EscapeCard(56),
                new EscapeCard(57),
                new PirateCard(58),
                new PirateCard(59),
                new PirateCard(60),
                new PirateCard(61),
                new PirateCard(62),
                new MermaidCard(63),
                new MermaidCard(64),
                new ScaryMaryEscapeCard(SCARY_MARY1_CARD_ID),
                new ScaryMaryPirateCard(SCARY_MARY2_CARD_ID),
                new SkullKingCard(67)
        );
    }
}
