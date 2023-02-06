package brunotot.skullking.security.factory;

import brunotot.skullking.web.dto.UserDto;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.util.Collections;

public class AuthenticationFactory {
    private static final Authentication SOCKET_PREFLIGHT_AUTH =
            new UsernamePasswordAuthenticationToken(
                    UserDto.builder().build(),
                    null,
                    Collections.emptyList()
            );

    public static Authentication getSocketPreflightAuth() {
        return SOCKET_PREFLIGHT_AUTH;
    }
}
