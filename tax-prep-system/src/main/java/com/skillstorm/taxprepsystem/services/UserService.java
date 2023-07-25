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
    public User findUserBySocial(long social) {

        return userRepository.findBySocial(social);
    }

    /**
     * Add new user to the User table.
     *
     * @param userData the user data
     * @return the user
     */
    public User addNewUser(User userData) {
        return userRepository.save(userData);
    }

    /**
     * Update existing user data that matches the ssn.
     *
     * @param userData the user data
     * @return the user
     */
    public User updateUser(User userData) {
        //probably need to rewrite this method to be more specific
        return userRepository.save(userData);
    }

    /**
     * Delete user from User table that matches the ssn.
     *
     * @param social the social
     * @return the int
     */
    public int deleteUser(Long social) {
        return userRepository.deleteBySocial(social);
    }
}
