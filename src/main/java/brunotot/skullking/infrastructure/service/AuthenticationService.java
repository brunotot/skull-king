package brunotot.skullking.infrastructure.service;

import brunotot.skullking.web.dto.LoginDto;
import brunotot.skullking.web.dto.UserDto;

public interface AuthenticationService {
    UserDto authenticate(LoginDto loginDto);
    UserDto findByUsername(String username);
}
