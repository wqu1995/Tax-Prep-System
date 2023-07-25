package com.skillstorm.taxprepsystem.services;

import com.skillstorm.taxprepsystem.models.User;
import com.skillstorm.taxprepsystem.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Find all users from User table.
     *
     * @return the list
     */
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Find user in User table that matches the social security number.
     *
     * @param social the ssn
     * @return the user
     */
    public User findUserBySocial(Long social) {

        return userRepository.findBySocial(social);
    }
}
