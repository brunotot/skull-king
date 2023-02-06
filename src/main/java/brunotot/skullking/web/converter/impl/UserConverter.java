package brunotot.skullking.web.converter.impl;

import brunotot.skullking.domain.User;
import brunotot.skullking.web.converter.Converter;
import brunotot.skullking.web.dto.UserDto;
import org.springframework.stereotype.Component;

@Component
public class UserConverter implements Converter<User, UserDto> {
    @Override
    public User toDomain(final UserDto userDto) {
        return User.builder()
                .id(userDto.getId())
                .username(userDto.getUsername())
                .build();
    }

    @Override
    public UserDto toDto(final User user) {
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .build();
    }
}
