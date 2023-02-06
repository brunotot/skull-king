package brunotot.skullking.web.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class UserDto {
    private String id;
    private String username;
    private String token;
}