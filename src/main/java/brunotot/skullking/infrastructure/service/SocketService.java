package brunotot.skullking.infrastructure.service;

import brunotot.skullking.domain.SocketEvent;

public interface SocketService {
    void sendToApp(SocketEvent socketEvent, Object payload);
    void sendToUser(SocketEvent socketEvent, Object payload, String username);
}
