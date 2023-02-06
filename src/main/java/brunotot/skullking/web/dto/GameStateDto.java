package brunotot.skullking.web.dto;

import brunotot.skullking.domain.CardAction;
import brunotot.skullking.domain.Phase;
import brunotot.skullking.domain.card.Card;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@AllArgsConstructor
@Builder
@Getter
@Setter
public class GameStateDto {
    private String id;
    private String currentPlayer;
    private String owner;
    private List<Card> hand;
    private List<CardAction> playedCards;
    private List<String> order;
    private List<Integer> validResponseCardIds;
    private Map<String, PlayerStatisticsDto> stats;
    private Phase phase;
    private Integer round;
    private Integer strongestCardId;
}
