package brunotot.skullking.domain;

import brunotot.skullking.infrastructure.service.impl.AppContextUtils;
import org.springframework.core.env.Environment;

public final class ApplicationProperties {
    private ApplicationProperties() {
        // NOOP
    }

    public static String[] getSecurityAllowedOriginPatterns() {
        return message("security.allowed-origin.patterns").split(";");
    }

    public static Integer getSkullKingOverPirateBonus() {
        return Integer.parseInt(message("game.trick.bonus.skull-king"));
    }

    public static Integer getMermaidOverSkullKingBonus() {
        return Integer.parseInt(message("game.trick.bonus.mermaid"));
    }

    public static Integer getOverZeroWinQuantifier() {
        return Integer.parseInt(message("game.round.over-zero-trick-quantifier"));
    }

    public static Integer getZeroWinQuantifier() {
        return Integer.parseInt(message("game.round.zero-trick-quantifier"));
    }

    public static Integer getLoseQuantifier() {
        return Integer.parseInt(message("game.round.lose-quantifier"));
    }

    private static Environment env() {
        return AppContextUtils.getBean(Environment.class);
    }

    private static String message(final String key) {
        return message(key, "");
    }

    private static String message(final String key, final String defaultValue) {
        return env().getProperty(key, defaultValue);
    }
}
