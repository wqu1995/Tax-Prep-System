package com.skillstorm.taxprepsystem.repositories;

import com.skillstorm.taxprepsystem.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserRepository extends MongoRepository<User, Long> {

    User findBySocial(long social);

    @Transactional
    int deleteBySocial(long social);
}
