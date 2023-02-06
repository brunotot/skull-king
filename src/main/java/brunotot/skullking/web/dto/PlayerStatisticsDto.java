package brunotot.skullking.web.dto;

import brunotot.skullking.domain.Phase;
import brunotot.skullking.domain.Player;
import lombok.Getter;

import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Getter
public class PlayerStatisticsDto {
    private final Map<Integer, PlayerRoundStatisticsDto> round;
    private final Integer total;

    public PlayerStatisticsDto(final Player player, final Integer round, final Phase phase) {
        this.round = player.getStats().entrySet().stream().collect(Collectors.toMap(
                Map.Entry::getKey,
                entry -> new PlayerRoundStatisticsDto(entry, round, phase))
        );
        this.total = this.round.values()
                .stream()
                .map(PlayerRoundStatisticsDto::getPoints)
                .filter(Objects::nonNull)
                .mapToInt(c -> c)
                .sum();
    }
}
