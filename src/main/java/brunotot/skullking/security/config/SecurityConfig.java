package brunotot.skullking.security.config;

import brunotot.skullking.domain.ApplicationProperties;
import brunotot.skullking.security.filter.JWTAuthFilter;
import brunotot.skullking.security.filter.UsernamePasswordAuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    private final UserAuthenticationProvider userAuthenticationProvider;

    public SecurityConfig(final UserAuthenticationProvider userAuthenticationProvider) {
        this.userAuthenticationProvider = userAuthenticationProvider;
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(final CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowCredentials(true)
                        .allowedOriginPatterns(ApplicationProperties.getSecurityAllowedOriginPatterns())
                        .allowedMethods("*");
            }
        };
    }

    @Bean
    public SecurityFilterChain securityFilterChain(final HttpSecurity http) throws Exception {
        http
                .addFilterBefore(new UsernamePasswordAuthFilter(this.userAuthenticationProvider), BasicAuthenticationFilter.class)
                .addFilterBefore(new JWTAuthFilter(this.userAuthenticationProvider), UsernamePasswordAuthFilter.class)
                .csrf().disable()
                .cors().and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeHttpRequests(requests -> requests
                        .requestMatchers(HttpMethod.POST, "/api/auth/login", "/api/auth/logout", "/api/auth/logout").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/health", "/api/ws/**").permitAll()
                        .requestMatchers("/api/**").authenticated()
                        .anyRequest().permitAll()
                );
        return http.build();
    }
}
