package brunotot.skullking.web.validator.impl;

import brunotot.skullking.infrastructure.service.UserService;
import brunotot.skullking.web.validator.UniqueUsername;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.stereotype.Component;

@Component
public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {
    private final UserService userService;

    public UniqueUsernameValidator(final UserService userService) {
        this.userService = userService;
    }

    @Override
    public boolean isValid(final String username, final ConstraintValidatorContext ctx) {
        return this.userService.findByUsername(username).isEmpty();
    }
}