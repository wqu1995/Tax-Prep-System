package com.skillstorm.taxprepsystem.repositories;

import com.skillstorm.taxprepsystem.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findBySocial(long social);

    @Transactional
    int deleteBySocial(long social);
}
