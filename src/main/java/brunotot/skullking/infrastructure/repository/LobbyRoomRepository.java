package brunotot.skullking.infrastructure.repository;

import brunotot.skullking.domain.LobbyRoom;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LobbyRoomRepository extends MongoRepository<LobbyRoom, String> {
    @Query("{owner:'?0'}")
    LobbyRoom findRoomByOwner(String owner);

    @Query("{'playerNames': {$in: ['?0']}}")
    LobbyRoom findRoomByParticipant(String participant);
}
