package brunotot.skullking.domain;

public enum SocketEvent {
    CREATE_ROOM("createRoom"),
    UPDATE_ROOM("updateRoom"),
    DELETE_ROOM("deleteRoom"),
    ENTER_ROOM("enterRoom"),
    START_GAME("startGame"),
    UPDATE_GAME("updateGame");

    private final String event;

    SocketEvent(final String event) {
        this.event = event;
    }

    public String getEvent() {
        return this.event;
    }
}
