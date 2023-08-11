package com.skillstorm.taxprepsystem.ServiceTests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.skillstorm.taxprepsystem.mappers.UserMapper;
import com.skillstorm.taxprepsystem.models.User;
import com.skillstorm.taxprepsystem.models.UserDto;
import com.skillstorm.taxprepsystem.repositories.UserRepository;
import com.skillstorm.taxprepsystem.services.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private UserMapper userMapper;

    @Test
    public void testFindAllUsers() {
        List<User> userList = new ArrayList<>();
        userList.add(new User(123123123, "John", "Man", 1231231231, "24 lane", "Austin", "Texas", 49922, "S"));
        userList.add(new User(345567123, "David", "Man", 789678567, "24 street", "Austin", "Texas", 49922, "MS"));
        userList.add(new User(123456789, "Joe", "Man", 567466345, "24 avenue", "Austin", "Texas", 49922, "S"));
        userList.add(new User(234345456, "George", "Man", 345756345, "24 route", "Los Angeles", "CA", 44321, "M"));
        userList.add(new User(456567678, "Al", "Man", 678765677, "24 trail", "Houston", "Texas", 12234, "MJ"));
        userList.add(new User(678789890, "Nick", "Man", 1231923131, "29 street", "Trenton", "NJ", 76654, "M"));

        when(userRepository.findAll()).thenReturn(userList);

        List<User> users = userService.findAllUsers();

        assertNotNull(users);
        assertEquals(users, userList);
    }

    @Test
    public void testFindUserBySocial_UserExists() {
        long social = 123123123;
        User user = new User(123123123, "John", "Man", 1231231231, "24 lane", "Austin", "Texas", 49922, "S");
        UserDto userDto = new UserDto(123123123, "John", "Man", "john@email.com", 213123123, "24 lane", "Austin", "Texas", 49922, "S");

        when(userRepository.findById(social)).thenReturn(Optional.of(user));
        when(userMapper.toDto(user)).thenReturn(userDto);

        UserDto foundUser = userService.findUserBySocial(social);

        assertNotNull(foundUser);
        assertEquals(foundUser, userDto);
    }

    @Test
    public void testFindUserBySocial_UserDoesNotExist() {
        long social = 123123123;

        when(userRepository.findById(social)).thenReturn(Optional.empty());

        UserDto foundUser = userService.findUserBySocial(social);

        assertNull(foundUser);
    }

    @Test
    public void testAddNewUser_EmailExists() {
        User newUser = new User(123123123, "John", "Man", 1231231231, "24 lane", "Austin", "Texas", 49922, "S");
        when(userRepository.findByEmail(newUser.getUsername())).thenReturn(Optional.of(newUser));

        ResponseEntity<Object> response = userService.addNewUser(newUser);

        assertNotNull(response);
        assertEquals(ResponseEntity.badRequest().body("Email already exist!"), response);
        verify(userRepository, never()).save(any());
    }

    @Test
    public void testAddNewUser_SocialExists() {
        User newUser = new User(123123123, "John", "Man", 1231231231, "24 lane", "Austin", "Texas", 49922, "S");
        when(userRepository.findByEmail(newUser.getUsername())).thenReturn(Optional.empty());
        when(userRepository.findById(newUser.getSocial())).thenReturn(Optional.of(newUser));

        ResponseEntity<Object> response = userService.addNewUser(newUser);

        assertNotNull(response);
        assertEquals(ResponseEntity.badRequest().body("Account associated with this SSN already exist!"), response);
        verify(userRepository, never()).save(any());
    }

    @Test
    public void testAddNewUser_Success() {
        User newUser = new User(123123123, "John", "Man", 1231231231, "24 lane", "Austin", "Texas", 49922, "S");
        when(userRepository.findByEmail(newUser.getUsername())).thenReturn(Optional.empty());
        when(userRepository.findById(newUser.getSocial())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(newUser.getPassword())).thenReturn("encodedPassword");

        ResponseEntity<Object> response = userService.addNewUser(newUser);

        assertNotNull(response);
        assertEquals(ResponseEntity.ok().build(), response);
        assertEquals("ROLE_USER", newUser.getRole());
        assertEquals("encodedPassword", newUser.getPassword());
        verify(userRepository, times(1)).save(newUser);
    }

    @Test
    public void testUpdateUser_UserExists() {
        User existingUser = new User(123123123, "John", "Man", 1231231231, "24 lane", "Austin", "Texas", 49922, "S");
        User updatedUser = new User(123123123, "John", "Man", 1231231231, "24 lane", "Houston", "Texas", 49922, "M");
        when(userRepository.findBySocial(existingUser.getSocial())).thenReturn(Optional.of(existingUser));


        ResponseEntity<Object> response = userService.updateUser(updatedUser);

        assertNotNull(response);
        assertEquals(updatedUser.getFirstName(), existingUser.getFirstName());
        assertEquals(updatedUser.getLastName(), existingUser.getLastName());
        assertEquals(updatedUser.getCity(), existingUser.getCity());
        assertEquals(updatedUser.getStatus(), existingUser.getStatus());
        verify(userRepository, times(1)).save(existingUser);
    }

    @Test
    public void testUpdateUser_UserDoesNotExist() {
        User updatedUser = new User(123123123, "John", "Man", 1231231231, "24 lane", "Austin", "Texas", 49922, "S");
        when(userRepository.findBySocial(updatedUser.getSocial())).thenReturn(Optional.empty());

        ResponseEntity<Object> response = userService.updateUser(updatedUser);

        assertNotNull(response);
        assertEquals(ResponseEntity.badRequest().body("User does not exist!"), response);
        verify(userRepository, never()).save(any());
    }

    @Test
    public void testDeleteUser() {
        long social = 123123123;

        when(userRepository.deleteBySocial(social)).thenReturn(1);

        int deletedCount = userService.deleteUser(social);

        assertEquals(1, deletedCount);
        verify(userRepository, times(1)).deleteBySocial(social);
    }

    @Test
    public void testLoadUserByUsername_UserExists() {
        String email = "test@example.com";
        User user = new User(123123123, "John", "Man", 1231231231, "24 lane", "Austin", "Texas", 49922, "S");
        user.setRole("user");
        user.setEmail(email);
        user.setPassword("password");
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        UserDetails userDetails = userService.loadUserByUsername(email);

        assertNotNull(userDetails);
        assertEquals(email, userDetails.getUsername());

    }

    @Test
    public void testLoadUserByUsername_UserDoesNotExist() {
        String email = "nonexistent@example.com";

        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> {
            userService.loadUserByUsername(email);
        });
    }

    @Test
    public void testGetUser_UserExists() {
        String email = "test@example.com";
        User user = new User(123123123, "John", "Man", 1231231231, "24 lane", "Austin", "Texas", 49922, "S");
        user.setRole("user");
        user.setEmail(email);
        user.setPassword("password");
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        User foundUser = userService.getUser(email);

        assertNotNull(foundUser);
        assertEquals(email, foundUser.getUsername());

    }

    @Test
    public void testGetUser_UserDoesNotExist() {
        String email = "nonexistent@example.com";
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());


        User foundUser = userService.getUser(email);


        assertNull(foundUser);
    }
}

