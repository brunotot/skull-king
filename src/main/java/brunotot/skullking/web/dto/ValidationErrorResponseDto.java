package brunotot.skullking.web.dto;

import lombok.Getter;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class ValidationErrorResponseDto {
    private static final String TITLE = "Validation failed";

    private final String title;
    private final int status;
    private final String path;
    private final List<String> errors;

    private ValidationErrorResponseDto(
            final MethodArgumentNotValidException ex,
            final WebRequest request
    ) {
        this.title = TITLE;
        this.status = ex.getStatusCode().value();
        this.path = ((ServletWebRequest) request).getRequest().getServletPath();
        this.errors = ex.getAllErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.toList());
    }

    public static ResponseEntity<Object> buildResponse(
            final MethodArgumentNotValidException ex,
            final WebRequest request
    ) {
        return ResponseEntity
                .badRequest()
                .body(new ValidationErrorResponseDto(ex, request));
    }
}
