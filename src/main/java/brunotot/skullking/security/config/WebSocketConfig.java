package brunotot.skullking.security.config;

import brunotot.skullking.domain.ApplicationProperties;
import brunotot.skullking.infrastructure.service.impl.SocketServiceImpl;
import brunotot.skullking.security.utils.JwtUtils;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import static brunotot.skullking.infrastructure.service.impl.SocketServiceImpl.DEST_PREFIX_WEB_SOCKET;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    private final UserAuthenticationProvider userAuthenticationProvider;

    public WebSocketConfig(final UserAuthenticationProvider userAuthenticationProvider) {
        this.userAuthenticationProvider = userAuthenticationProvider;
    }

    @Override
    public void configureMessageBroker(final MessageBrokerRegistry config) {
        config.enableSimpleBroker(SocketServiceImpl.DEST_PREFIX_CLIENT);
        config.setApplicationDestinationPrefixes(SocketServiceImpl.DEST_PREFIX_APP);
        config.setUserDestinationPrefix(SocketServiceImpl.DEST_PREFIX_USER);
    }

    @Override
    public void registerStompEndpoints(final StompEndpointRegistry registry) {
        registry.addEndpoint(DEST_PREFIX_WEB_SOCKET)
                .setAllowedOriginPatterns(ApplicationProperties.getSecurityAllowedOriginPatterns())
                .withSockJS();
    }

    @Override
    public void configureClientInboundChannel(final ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(final Message<?> message, final MessageChannel channel) {
                StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
                if (accessor != null && StompCommand.CONNECT.equals(accessor.getCommand())) {
                    var token = JwtUtils.getJwtFromStompHeaderAccessor(accessor);
                    userAuthenticationProvider.validateToken(token);
                }
                return message;
            }
        });
    }
}