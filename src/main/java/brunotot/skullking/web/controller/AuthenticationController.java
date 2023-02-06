package brunotot.skullking.web.controller;

import brunotot.skullking.infrastructure.service.impl.UserServiceImpl;
import brunotot.skullking.security.config.UserAuthenticationProvider;
import brunotot.skullking.web.dto.RegisterDto;
import brunotot.skullking.web.dto.UserDto;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(AuthenticationController.AUTH_BASE_ENDPOINT)
public class AuthenticationController {
    public static final String AUTH_BASE_ENDPOINT = "/auth";
    public static final String AUTH_LOGIN_ENDPOINT = "/login";
    public static final String AUTH_LOGOUT_ENDPOINT = "/logout";
    public static final String AUTH_REGISTER_ENDPOINT = "/register";
    public static final String LOGIN_ENDPOINT = AUTH_BASE_ENDPOINT + AUTH_LOGIN_ENDPOINT;
    public static final String REGISTER_ENDPOINT = AUTH_BASE_ENDPOINT + AUTH_REGISTER_ENDPOINT;

    private final UserServiceImpl userService;
    private final UserAuthenticationProvider userAuthenticationProvider;

    public AuthenticationController(
            final UserServiceImpl userService,
            final UserAuthenticationProvider userAuthenticationProvider
    ) {
        this.userService = userService;
        this.userAuthenticationProvider = userAuthenticationProvider;
    }

    @PostMapping(AUTH_LOGIN_ENDPOINT)
    public ResponseEntity<UserDto> login(final @AuthenticationPrincipal UserDto user) {
        user.setToken(this.userAuthenticationProvider.createToken(user.getUsername()));
        return ResponseEntity.ok(user);
    }

    @PostMapping(AUTH_REGISTER_ENDPOINT)
    public ResponseEntity<UserDto> register(final @RequestBody @Valid RegisterDto user) {
        return ResponseEntity.ok(this.userService.register(user));
    }

    @PostMapping(AUTH_LOGOUT_ENDPOINT)
    public ResponseEntity<Void> logout(final @AuthenticationPrincipal UserDto user) {
        SecurityContextHolder.clearContext();
        return ResponseEntity.noContent().build();
    }
}
