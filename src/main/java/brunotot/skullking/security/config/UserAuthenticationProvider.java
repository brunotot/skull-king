package brunotot.skullking.security.config;

import brunotot.skullking.infrastructure.service.impl.AuthenticationServiceImpl;
import brunotot.skullking.web.dto.LoginDto;
import brunotot.skullking.web.dto.UserDto;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;

@Component
public class UserAuthenticationProvider {
    private static final long MINUTE_IN_MS = 1000 * 60;

    private final String secretKey;
    private final long expirationMs;
    private final AuthenticationServiceImpl authenticationService;

    public UserAuthenticationProvider(
            final AuthenticationServiceImpl authenticationService,
            final @Value("${security.jwt.token.expiration-minutes}") String expirationMinutesString,
            final @Value("${security.jwt.token.secret}") String secretKey
    ) {
        var expirationMinutes = Integer.parseInt(expirationMinutesString);
        this.authenticationService = authenticationService;
        this.secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
        this.expirationMs = expirationMinutes * UserAuthenticationProvider.MINUTE_IN_MS;
    }

    public String createToken(final String username) {
        var now = new Date();
        return JWT.create()
                .withIssuer(username)
                .withIssuedAt(now)
                .withExpiresAt(new Date(now.getTime() + this.expirationMs))
                .sign(Algorithm.HMAC256(this.secretKey));
    }

    public Authentication validateToken(final String token) {
        var algorithm = Algorithm.HMAC256(this.secretKey);
        var verifier = JWT.require(algorithm).build();
        var decoded = verifier.verify(token);
        var user = this.authenticationService.findByUsername(decoded.getIssuer());
        return this.buildAuth(user);
    }

    public Authentication validateCredentials(final LoginDto loginDto) {
        return this.buildAuth(this.authenticationService.authenticate(loginDto));
    }

    private Authentication buildAuth(final UserDto userDto) {
        return new UsernamePasswordAuthenticationToken(userDto, null, Collections.emptyList());
    }
}
