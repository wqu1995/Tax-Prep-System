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

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public User findUserBySocial(Long id) {

        return userRepository.findBySocial(id);
    }
}
