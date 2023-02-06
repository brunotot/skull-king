package brunotot.skullking.domain;

import lombok.Getter;

import java.util.Objects;

@Getter
public class Round {
    public static final Integer MIN_ROUND_VALUE = 1;
    public static final Integer MAX_ROUND_VALUE = 10;

    private static final String GAME_FINISHED_ERROR_MSG = "Game is finished. Unable to proceed to next round!";

    private Integer value;

    public Round() {
        this.value = MIN_ROUND_VALUE;
    }

    public boolean isFinalRound()  {
        return this.value.equals(MAX_ROUND_VALUE);
    }

    public void nextRound() {
        if (Objects.equals(this.value, MAX_ROUND_VALUE)) {
            throw new UnsupportedOperationException(GAME_FINISHED_ERROR_MSG);
        }
        this.value++;
    }

    @Override
    public boolean equals(final Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Round round = (Round) o;
        return Objects.equals(value, round.value);
    }

    @Override
    public int hashCode() {
        return Objects.hash(value);
    }
}
