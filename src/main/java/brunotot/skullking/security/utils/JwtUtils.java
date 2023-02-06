package brunotot.skullking.security.utils;

import org.springframework.http.HttpHeaders;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;

import java.util.Collections;
import java.util.Optional;

public final class JwtUtils {
    private static final String BEARER_TOKEN_PREFIX = "Bearer ";

    private JwtUtils() {
        // NOOP
    }

    public static String getJwtFromHeader(final String header) {
        return Optional.ofNullable(header)
                .filter(h -> h.startsWith(BEARER_TOKEN_PREFIX))
                .map(h -> h.substring(BEARER_TOKEN_PREFIX.length()))
                .orElse("");
    }

    public static String getJwtFromStompHeaderAccessor(final StompHeaderAccessor accessor) {
        return getJwtFromHeader(Optional.ofNullable(accessor.getNativeHeader(HttpHeaders.AUTHORIZATION))
                .orElse(Collections.emptyList())
                .stream()
                .findFirst()
                .orElse(""));
    }
}
