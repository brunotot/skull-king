package brunotot.skullking.web.dto;

import brunotot.skullking.web.validator.PasswordsMatch;
import brunotot.skullking.web.validator.UniqueUsername;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@PasswordsMatch
public class RegisterDto {
    @UniqueUsername
    @Size(min = 5, message = "Username must contain at least 5 characters")
    private String username;
    @Size(min = 5, message = "Password must contain at least 5 characters")
    private String password;
    private String confirmPassword;
}