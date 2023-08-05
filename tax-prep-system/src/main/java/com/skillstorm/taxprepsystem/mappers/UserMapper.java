package com.skillstorm.taxprepsystem.mappers;

import com.skillstorm.taxprepsystem.models.User;
import com.skillstorm.taxprepsystem.models.UserDTO;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public UserDTO toDto(User user){
        return new UserDTO(user.getSocial(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getPhone(), user.getStreetAddr(), user.getCity(), user.getState(), user.getZip(), user.getStatus());
    }
}
