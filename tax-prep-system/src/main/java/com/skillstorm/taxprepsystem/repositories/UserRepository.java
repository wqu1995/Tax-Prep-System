package com.skillstorm.taxprepsystem.repositories;

import com.skillstorm.taxprepsystem.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, Long> {

    Optional<User> findBySocial(long social);

    Optional<User> findByEmail(String email);

    @Transactional
    int deleteBySocial(long social);
}
