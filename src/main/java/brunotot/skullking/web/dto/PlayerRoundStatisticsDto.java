package brunotot.skullking.web.dto;

import brunotot.skullking.domain.Phase;
import brunotot.skullking.domain.RoundData;
import lombok.Getter;

import static java.util.Map.Entry;

@Getter
public class PlayerRoundStatisticsDto {
    private final Integer expectedWinners;
    private final Integer actualWinners;
    private final Integer points;

    public PlayerRoundStatisticsDto(
            final Entry<Integer, RoundData> roundDataEntry,
            final Integer currentRound,
            final Phase phase
    ) {
        var roundData = roundDataEntry.getValue();
        var expectedWins = roundData.getExpectedWins();
        var round = roundDataEntry.getKey();
        this.expectedWinners = round.equals(currentRound) && !Phase.PLAY_CARD.equals(phase) && !Phase.GAME_OVER.equals(phase) ? null : expectedWins;
        this.points = round < currentRound || Phase.GAME_OVER.equals(phase) ? roundData.getTotalScore(round) : null;
        this.actualWinners = roundData.getActualWins();
    }
}
