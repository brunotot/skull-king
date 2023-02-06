package brunotot.skullking.security.filter;

import brunotot.skullking.security.config.UserAuthenticationProvider;
import brunotot.skullking.security.factory.AuthenticationFactory;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Objects;

public class JWTAuthFilter extends OncePerRequestFilter {
    private static final String SOCKET_ENDPOINT_PREFIX = "/ws/";

    private final UserAuthenticationProvider provider;

    public JWTAuthFilter(final UserAuthenticationProvider provider) {
        this.provider = provider;
    }

    @Override
    protected void doFilterInternal(
            final HttpServletRequest request,
            final HttpServletResponse response,
            final FilterChain filterChain
    ) throws ServletException, IOException {
        var header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (Objects.nonNull(header)) {
            var authElements = header.split(" ");
            if (authElements.length == 2 && "Bearer".equals(authElements[0])) {
                try {
                    SecurityContextHolder.getContext().setAuthentication(this.provider.validateToken(authElements[1]));
                } catch (final RuntimeException e) {
                    SecurityContextHolder.clearContext();
                    throw e;
                }
            }
        } else if (request.getServletPath().startsWith(SOCKET_ENDPOINT_PREFIX)) {
            SecurityContextHolder.getContext().setAuthentication(AuthenticationFactory.getSocketPreflightAuth());
        }

        filterChain.doFilter(request, response);
    }
}
