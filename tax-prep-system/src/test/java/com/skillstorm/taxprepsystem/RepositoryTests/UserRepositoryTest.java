package com.skillstorm.taxprepsystem.RepositoryTests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.skillstorm.taxprepsystem.models.User;
import com.skillstorm.taxprepsystem.repositories.UserRepository;

@DataMongoTest
@ActiveProfiles("test")
@ExtendWith(SpringExtension.class)
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testFindBySocial() {
        User sampleUser = new User(123123123, "John", "Man", 1231231231, "24 lane", "Austin", "Texas", 49922, "S");
        sampleUser.setEmail("john@john.com");
        sampleUser.setPassword("password");
        sampleUser.setRole("user");
        userRepository.save(sampleUser);

        Optional<User> foundUser = userRepository.findBySocial(123123123);

        assertTrue(foundUser.isPresent());
        assertEquals("John Doe", foundUser.get().getFirstName());
    }

    @Test
    public void testFindByEmail() {
        User sampleUser = new User(123123123, "John", "Man", 1231231231, "24 lane", "Austin", "Texas", 49922, "S");
        sampleUser.setEmail("john@john.com");
        sampleUser.setPassword("password");
        sampleUser.setRole("user");
        userRepository.save(sampleUser);

        Optional<User> foundUser = userRepository.findByEmail("john@john.com");

        assertTrue(foundUser.isPresent());
        assertEquals(987654321L, foundUser.get().getSocial());
    }

    @Test
    public void testDeleteBySocial() {
        User sampleUser = new User(123123123, "John", "Man", 1231231231, "24 lane", "Austin", "Texas", 49922, "S");
        sampleUser.setEmail("john@john.com");
        sampleUser.setPassword("password");
        sampleUser.setRole("user");
        userRepository.save(sampleUser);

        int deletedCount = userRepository.deleteBySocial(123123123);

        assertEquals(1, deletedCount);
        assertFalse(userRepository.findBySocial(123123123).isPresent());
    }
}
