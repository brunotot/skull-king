package brunotot.skullking.security.filter;

import brunotot.skullking.security.config.UserAuthenticationProvider;
import brunotot.skullking.web.controller.AuthenticationController;
import brunotot.skullking.web.dto.LoginDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpMethod;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class UsernamePasswordAuthFilter extends OncePerRequestFilter {
    private static final ObjectMapper MAPPER = new ObjectMapper();

    private final UserAuthenticationProvider provider;

    public UsernamePasswordAuthFilter(final UserAuthenticationProvider provider) {
        this.provider = provider;
    }

    @Override
    protected void doFilterInternal(
            final HttpServletRequest request,
            final HttpServletResponse response,
            final FilterChain filterChain
    ) throws ServletException, IOException {
        if (AuthenticationController.LOGIN_ENDPOINT.equals(request.getServletPath())
                && HttpMethod.POST.matches(request.getMethod())) {
            LoginDto loginDto = MAPPER.readValue(request.getInputStream(), LoginDto.class);
            try {
                SecurityContextHolder.getContext().setAuthentication(this.provider.validateCredentials(loginDto));
            } catch (final RuntimeException e) {
                SecurityContextHolder.clearContext();
                throw e;
            }
        }
        filterChain.doFilter(request, response);
    }
}
