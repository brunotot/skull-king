package brunotot.skullking.infrastructure.service.impl;

import brunotot.skullking.domain.User;
import brunotot.skullking.infrastructure.repository.UserRepository;
import brunotot.skullking.infrastructure.service.UserService;
import brunotot.skullking.web.converter.impl.RegisterConverter;
import brunotot.skullking.web.converter.impl.UserConverter;
import brunotot.skullking.web.dto.RegisterDto;
import brunotot.skullking.web.dto.UserDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final RegisterConverter registerConverter;
    private final UserRepository userRepository;
    private final UserConverter userConverter;

    public UserServiceImpl(
            final RegisterConverter registerConverter,
            final UserRepository userRepository,
            final UserConverter userConverter
    ) {
        this.registerConverter = registerConverter;
        this.userRepository = userRepository;
        this.userConverter = userConverter;
    }

    @Override
    public List<UserDto> findAll() {
        return this.userConverter.toDto(this.userRepository.findAll());
    }

    @Override
    public Optional<User> findByUsername(final String username) {
        return Optional.ofNullable(this.userRepository.findByUsername(username));
    }

    @Override
    public UserDto register(final RegisterDto registerDto) {
        var user = this.registerConverter.toDomain(registerDto);
        var createdUser = this.userRepository.save(user);
        return this.userConverter.toDto(createdUser);
    }
}