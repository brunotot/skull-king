package brunotot.skullking.infrastructure.service.impl;

import brunotot.skullking.domain.SocketEvent;
import brunotot.skullking.infrastructure.service.SocketService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class SocketServiceImpl implements SocketService {
    public static final String DEST_PREFIX_WEB_SOCKET = "/ws";
    public static final String DEST_PREFIX_CLIENT = "/topic";
    public static final String DEST_PREFIX_APP = "/app";
    public static final String DEST_PREFIX_USER = "/user";

    private static final ObjectMapper MAPPER = new ObjectMapper();

    private final SimpMessagingTemplate simpMessagingTemplate;

    public SocketServiceImpl(final SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @Override
    public void sendToApp(final SocketEvent socketEvent, final Object payload) {
        this.simpMessagingTemplate.convertAndSend(
                DEST_PREFIX_CLIENT + "/" + socketEvent.getEvent(),
                this.getPayloadAsJson(payload)
        );
    }

    @Override
    public void sendToUser(final SocketEvent socketEvent, final Object payload, final String username) {
        this.simpMessagingTemplate.convertAndSend(
                DEST_PREFIX_CLIENT + "/" + DEST_PREFIX_USER + "/" + username + "/" + socketEvent.getEvent(),
                this.getPayloadAsJson(payload)
        );
    }

    private Object getPayloadAsJson(final Object payload) {
        try {
            return MAPPER.writeValueAsString(payload);
        } catch (final Exception ignored) {
            return payload;
        }
    }
}
