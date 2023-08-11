package com.skillstorm.taxprepsystem.ControllerTests;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillstorm.taxprepsystem.controllers.UserController;
import com.skillstorm.taxprepsystem.models.User;
import com.skillstorm.taxprepsystem.models.UserDto;
import com.skillstorm.taxprepsystem.security.JWTGenerator;
import com.skillstorm.taxprepsystem.services.UserService;

@WebMvcTest(UserController.class)
@AutoConfigureMockMvc
@Import(TestSecurityConfig.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private AuthenticationManager authenticationManager;

    @MockBean
    private JWTGenerator jwtGenerator;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @WithMockUser
    public void testFindAllUsers() throws Exception {
        List<User> userList = new ArrayList<>();
        userList.add(new User(123123123, "John", "Man", 1231231231, "24 lane", "Austin", "Texas", 49922, "S"));
        userList.add(new User(345567123, "David", "Man", 789678567, "24 street", "Austin", "Texas", 49922, "MS"));
        userList.add(new User(123456789, "Joe", "Man", 567466345, "24 avenue", "Austin", "Texas", 49922, "S"));
        userList.add(new User(234345456, "George", "Man", 345756345, "24 route", "Los Angeles", "CA", 44321, "M"));
        userList.add(new User(456567678, "Al", "Man", 678765677, "24 trail", "Houston", "Texas", 12234, "MJ"));
        userList.add(new User(678789890, "Nick", "Man", 1231923131, "29 street", "Trenton", "NJ", 76654, "M"));

        when(userService.findAllUsers()).thenReturn(userList);

        mockMvc.perform(MockMvcRequestBuilders.get("/users")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.status().isInternalServerError());
    }

    @Test
    @WithMockUser
    public void testFindUserBySocial() throws Exception {
        UserDto user = new UserDto(123123123, "email@email.com");

        when(userService.findUserBySocial(anyLong())).thenReturn(user);

        mockMvc.perform(MockMvcRequestBuilders.get("/users/user/{social}", 123456789)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @WithMockUser
    public void testAddNewUser() throws Exception {
        User newUser = new User(123123123, "John", "Man", 1231231231, "24 lane", "Austin", "Texas", 49922, "S");
        newUser.setRole("user");

        when(userService.addNewUser(any(User.class))).thenReturn(ResponseEntity.ok().build());

        mockMvc.perform(MockMvcRequestBuilders.post("/users/register")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    @Test
    @WithMockUser
    public void testUpdateUser() throws Exception {
        User userToUpdate = new User(123123123, "John", "Man", 1231231231, "24 lane", "Austin", "Texas", 49922, "S");
        userToUpdate.setRole("user");
        when(userService.updateUser(any(User.class))).thenReturn(ResponseEntity.ok().build());

        mockMvc.perform(MockMvcRequestBuilders.put("/users/updateUser")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    @Test
    @WithMockUser
    public void testDeleteUser() throws Exception {
        when(userService.deleteUser(anyLong())).thenReturn(1);

        mockMvc.perform(MockMvcRequestBuilders.delete("/users/deleteUser/{social}", 123456789)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.status().isOk());
    }
}
