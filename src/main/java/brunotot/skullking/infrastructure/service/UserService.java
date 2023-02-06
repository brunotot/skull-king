package brunotot.skullking.infrastructure.service;

import brunotot.skullking.domain.User;
import brunotot.skullking.web.dto.RegisterDto;
import brunotot.skullking.web.dto.UserDto;

import java.util.List;
import java.util.Optional;

public interface UserService {
    Optional<User> findByUsername(String username);
    UserDto register(RegisterDto registerDto);
    List<UserDto> findAll();
}
