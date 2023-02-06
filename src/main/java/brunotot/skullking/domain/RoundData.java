package brunotot.skullking.domain;

import lombok.Getter;

import java.util.Objects;

@Getter
public class RoundData {
    private static final Integer ZERO_WIN_PTS_QUANTIFIER = ApplicationProperties.getZeroWinQuantifier();
    private static final Integer NON_ZERO_WIN_PTS_QUANTIFIER = ApplicationProperties.getOverZeroWinQuantifier();
    private static final Integer LOSE_QUANTIFIER = ApplicationProperties.getLoseQuantifier();

    private final Integer expectedWins;
    private Integer actualWins;
    private Integer bonus;

    public RoundData(final Integer expectedWins) {
        this.expectedWins = expectedWins;
        this.actualWins = 0;
        this.bonus = 0;
    }

    public void appendWin(final Integer bonus) {
        this.actualWins++;
        this.bonus += bonus;
    }

    public Integer getTotalScore(final Integer roundValue) {
        if (Objects.equals(this.actualWins, this.expectedWins)) {
            if (this.actualWins == 0) {
                return roundValue * ZERO_WIN_PTS_QUANTIFIER + bonus;
            }
            return this.actualWins * NON_ZERO_WIN_PTS_QUANTIFIER + bonus;
        }
        return Math.abs(this.expectedWins - this.actualWins) * LOSE_QUANTIFIER;
    }
}
