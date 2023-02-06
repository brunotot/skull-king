package brunotot.skullking.domain;

import brunotot.skullking.domain.card.Card;
import brunotot.skullking.domain.card.impl.*;
import brunotot.skullking.infrastructure.service.SocketService;
import brunotot.skullking.infrastructure.service.impl.AppContextUtils;
import brunotot.skullking.infrastructure.utils.SecurityContextUtils;
import brunotot.skullking.web.converter.impl.GameStateConverter;
import brunotot.skullking.web.dto.PlayerStatisticsDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.*;
import java.util.stream.Collectors;

@Document("game-state")
@NoArgsConstructor
@Getter
@Setter
public class GameState {
    private static final Integer SKULL_KING_OVER_PIRATE_BONUS = ApplicationProperties.getSkullKingOverPirateBonus();
    private static final Integer MERMAID_OVER_SKULL_KING_BONUS = ApplicationProperties.getMermaidOverSkullKingBonus();
    private static final String PLAYER_NOT_FOUND_ERROR_MSG_FORMAT = "Player \"%s\" does not exist.";

    @Id
    private String id;
    private String startingPlayer;
    private String owner;

    private Round round;
    private Phase phase;

    private List<CardAction> actions;
    private List<Player> players;
    private List<String> turns;
    private List<String> order;

    public GameState(final String id, final List<String> playerNames) {
        this.owner = SecurityContextUtils.getUsername();
        this.id = id;
        this.round = new Round();
        this.players = playerNames.stream().map(Player::new).collect(Collectors.toList());
        this.phase = Phase.CHOOSE_WINNERS;
        this.turns = new ArrayList<>();
        this.actions = new ArrayList<>();
        this.order = new ArrayList<>();
        this.startingPlayer = getRandomPlayerName(this.players);
        this.initializeTurns(this.startingPlayer);
        Deck.dealCards(Round.MIN_ROUND_VALUE, this.players);
    }

    public void executeTurn(final Integer actionValue) {
        if (Phase.GAME_OVER.equals(this.phase)) {
            return;
        }
        var playerName = this.turns.remove(0);

        if (Phase.CHOOSE_WINNERS.equals(this.phase)) {
            this.getPlayer(playerName).getStats().put(this.round.getValue(), new RoundData(actionValue));
        } else if (Phase.PLAY_CARD.equals(this.phase)) {
            this.getPlayer(playerName).removeCard(actionValue);
        }

        this.actions.add(new CardAction(playerName, actionValue));

        if (this.isRoundOver()) {
            this.nextPhase();
        }
    }

    public List<Integer> getValidResponseCardIds(final String player) {
        if (!Phase.PLAY_CARD.equals(this.phase)) {
            return List.of();
        }
        return new GameRules(this).getValidResponseCards(player).stream().map(Card::getId).collect(Collectors.toList());
    }

    public Integer getStrongestActionCardId() {
        if (!Phase.PLAY_CARD.equals(this.phase)) {
            return null;
        }
        return Optional.ofNullable(new GameRules(this)
                .getStrongestPlayedCard())
                .map(Card::getId)
                .orElse(null);
    }

    public Map<String, PlayerStatisticsDto> getPlayerStats() {
        return this.players.stream().collect(Collectors.toMap(
                Player::getName,
                player -> new PlayerStatisticsDto(
                        player,
                        this.round.getValue(),
                        this.phase
                )
        ));
    }

    private boolean doPlayersHaveAnyCardsInTheirHand() {
        return this.players.stream().anyMatch(player -> !player.getCards().isEmpty());
    }

    public List<Card> getActionCards() {
        return this.actions.stream()
                .map(e -> Deck.getCard(e.getValue()))
                .collect(Collectors.toList());
    }

    private String getPlayerNameWithStrongestCard(final Card strongestCard) {
        return this.actions.stream()
                .filter(action -> strongestCard.getId().equals(action.getValue()))
                .findFirst()
                .map(CardAction::getPlayerName)
                .orElseThrow();
    }

    private void populatePoints(final Card strongestCard) {
        var winningPlayer = this.getPlayer(this.getPlayerNameWithStrongestCard(strongestCard));
        var skullKingExists = this.actions.stream().anyMatch(a -> Deck.getCard(a.getValue()).is(SkullKingCard.class));
        var numberOfPirates = this.actions.stream()
                .map(a -> Deck.getCard(a.getValue()))
                .filter(c -> c.is(PirateCard.class) || c.is(ScaryMaryPirateCard.class) || c.is(ScaryMaryEscapeCard.class))
                .count();
        var bonus = 0;
        if (strongestCard.is(SkullKingCard.class)) {
            bonus += numberOfPirates * SKULL_KING_OVER_PIRATE_BONUS;
        } else if (strongestCard.is(MermaidCard.class) && skullKingExists) {
            bonus += MERMAID_OVER_SKULL_KING_BONUS;
        }
        winningPlayer.appendWin(this.round, bonus);
    }

    private void populateTotalPoints() {
        for (var player : this.players) {
            var totalRoundScore = player.getStats()
                    .get(this.round.getValue())
                    .getTotalScore(this.round.getValue());
            player.setTotalScore(player.getTotalScore() + totalRoundScore);
        }
    }

    private void setNextStartingPlayer() {
        var player = this.getPlayer(this.startingPlayer);
        var indexOf = this.players.indexOf(player) + 1;
        if (indexOf == this.players.size()) {
            indexOf = 0;
        }
        this.startingPlayer = this.players.get(indexOf).getName();
    }

    private void pingCurrentState() {
        var socketService = AppContextUtils.getBean(SocketService.class);
        var gameStateConverter = AppContextUtils.getBean(GameStateConverter.class);
        this.getPlayers().forEach(player -> {
            var username = player.getName();
            var gameStateDto = gameStateConverter.toDto(this, username);
            socketService.sendToUser(SocketEvent.UPDATE_GAME, gameStateDto, username);
        });
        try {
            Thread.sleep(2500);
        } catch (final Exception ignored) {
            // NOOP
        }
    }

    private void nextPhase() {
        if (Phase.GAME_OVER.equals(this.phase)) {
            return;
        }

        if (Phase.PLAY_CARD.equals(this.phase)) {
            this.pingCurrentState();

            var strongestCard = new GameRules(this).getStrongestPlayedCard();
            this.populatePoints(strongestCard);
            var winningPlayer = this.getPlayer(this.getPlayerNameWithStrongestCard(strongestCard));

            if (this.doPlayersHaveAnyCardsInTheirHand()) {
                this.initializeTurns(winningPlayer.getName());
                return;
            }

            this.populateTotalPoints();

            if (this.isGameOver()) {
                this.phase = Phase.GAME_OVER;
                return;
            }

            this.phase = Phase.CHOOSE_WINNERS;
            this.round.nextRound();

            this.setNextStartingPlayer();
            this.initializeTurns(this.startingPlayer);
            Deck.dealCards(this.getRound().getValue(), this.players);
            return;
        }

        if (Phase.CHOOSE_WINNERS.equals(this.phase)) {
            this.phase = Phase.PLAY_CARD;
            this.initializeTurns(this.startingPlayer);
        }
    }

    private boolean isRoundOver() {
        return this.turns.isEmpty();
    }

    private boolean isGameOver() {
        return Phase.GAME_OVER.equals(this.phase) ||
                (
                        this.round.isFinalRound()
                                && !this.doPlayersHaveAnyCardsInTheirHand()
                                && Phase.PLAY_CARD.equals(this.phase)
                );
    }

    @Transient
    public String getCurrentPlayerName() {
        return this.turns.stream().findFirst().orElse("");    }


    @Transient
    public Player getPlayer(final String name) {
        Objects.requireNonNull(name);
        for (var player : this.players) {
            if (name.equals(player.getName())) {
                return player;
            }
        }
        throw new IllegalArgumentException(String.format(PLAYER_NOT_FOUND_ERROR_MSG_FORMAT, name));
    }

    public boolean playerExists(final String player) {
        return this.players.stream().anyMatch(p -> p.getName().equals(player));
    }

    private void initializeTurns(final String firstPlayer) {
        this.turns.clear();
        this.actions.clear();
        this.order.clear();
        int startIndex = 0;
        for (int i = 0; i < this.players.size(); i++) {
            if (this.players.get(i).getName().equals(firstPlayer)) {
                startIndex = i;
                break;
            }
        }
        for (int i = startIndex; i < this.players.size(); i++) {
            this.turns.add(this.players.get(i).getName());
            this.order.add(this.players.get(i).getName());
        }
        for (int i = 0; i < startIndex; i++) {
            this.turns.add(this.players.get(i).getName());
            this.order.add(this.players.get(i).getName());
        }
    }

    private static String getRandomPlayerName(final List<Player> players) {
        Random rand = new Random();
        int index = rand.nextInt(players.size());
        return players.get(index).getName();
    }
}
