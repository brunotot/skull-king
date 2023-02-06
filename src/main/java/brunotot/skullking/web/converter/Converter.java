package brunotot.skullking.web.converter;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

public interface Converter<DOMAIN, DTO> {
    default DOMAIN toDomain(DTO dto) {
        throw new UnsupportedOperationException("Method not implemented");
    }
    default DTO toDto(DOMAIN domain) {
        throw new UnsupportedOperationException("Method not implemented");
    }
    default List<DTO> toDto(List<DOMAIN> domains) {
        return this.mapToList(domains, this::toDto);
    }
    default List<DOMAIN> toDomain(List<DTO> dtos) {
        return this.mapToList(dtos, this::toDomain);
    }
    private <X, Y> List<X> mapToList(final List<Y> list, final Function<Y, X> mapperFn) {
        return Optional.ofNullable(list)
                .orElse(Collections.emptyList())
                .stream()
                .filter(Objects::nonNull)
                .map(mapperFn)
                .collect(Collectors.toList());
    }
}
