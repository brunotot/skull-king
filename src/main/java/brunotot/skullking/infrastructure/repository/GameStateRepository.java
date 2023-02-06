package brunotot.skullking.infrastructure.repository;

import brunotot.skullking.domain.GameState;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameStateRepository extends MongoRepository<GameState, String> {

}
