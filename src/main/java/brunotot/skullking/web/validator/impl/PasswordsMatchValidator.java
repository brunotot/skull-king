package brunotot.skullking.web.validator.impl;

import brunotot.skullking.web.dto.RegisterDto;
import brunotot.skullking.web.validator.PasswordsMatch;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Objects;

public class PasswordsMatchValidator implements ConstraintValidator<PasswordsMatch, RegisterDto> {
    @Override
    public boolean isValid(final RegisterDto registerDto, final ConstraintValidatorContext ctx) {
        return Objects.equals(registerDto.getPassword(), registerDto.getConfirmPassword());
    }
}