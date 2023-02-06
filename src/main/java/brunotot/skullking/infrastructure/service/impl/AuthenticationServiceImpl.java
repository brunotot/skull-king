package brunotot.skullking.infrastructure.service.impl;

import brunotot.skullking.infrastructure.service.AuthenticationService;
import brunotot.skullking.infrastructure.service.UserService;
import brunotot.skullking.web.converter.impl.UserConverter;
import brunotot.skullking.web.dto.LoginDto;
import brunotot.skullking.web.dto.UserDto;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final UserConverter userConverter;

    public AuthenticationServiceImpl(
            final PasswordEncoder passwordEncoder,
            final UserService userService,
            final UserConverter userConverter
    ) {
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.userConverter = userConverter;
    }

    public UserDto authenticate(final LoginDto loginDto) {
        var username = loginDto.getUsername();
        var user = this.userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Invalid username"));
        var encodedDatabasePassword = user.getEncodedPassword();
        var userPasswordInput = loginDto.getPassword();
        if (this.passwordEncoder.matches(userPasswordInput, encodedDatabasePassword)) {
            return this.userConverter.toDto(user);
        }
        throw new RuntimeException("Invalid password");
    }

    public UserDto findByUsername(final String username) {
        return this.userService.findByUsername(username)
                .map(this.userConverter::toDto)
                .orElseThrow(() -> new RuntimeException("Invalid password"));
    }
}