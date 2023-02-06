package brunotot.skullking.web.converter.impl;

import brunotot.skullking.domain.User;
import brunotot.skullking.web.converter.Converter;
import brunotot.skullking.web.dto.RegisterDto;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class RegisterConverter implements Converter<User, RegisterDto> {
    private final PasswordEncoder passwordEncoder;

    public RegisterConverter(final PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User toDomain(final RegisterDto registerDto) {
        return User.builder()
                .username(registerDto.getUsername())
                .encodedPassword(this.passwordEncoder.encode(registerDto.getPassword()))
                .build();
    }
}
