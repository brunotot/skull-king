package brunotot.skullking.infrastructure.utils;

import brunotot.skullking.web.dto.UserDto;
import org.springframework.security.core.context.SecurityContextHolder;

public final class SecurityContextUtils {
    private SecurityContextUtils() {
        // NOOP
    }

    public static UserDto getCurrentUser() {
        return (UserDto) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
    }

    public static String getUsername() {
        return SecurityContextUtils.getCurrentUser().getUsername();
    }
}
