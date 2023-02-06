package brunotot.skullking.infrastructure.repository;

import brunotot.skullking.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, Long> {
    @Query("{username:'?0'}")
    User findByUsername(String username);
}
