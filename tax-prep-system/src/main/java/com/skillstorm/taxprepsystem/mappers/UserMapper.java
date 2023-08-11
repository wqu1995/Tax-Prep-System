package com.skillstorm.taxprepsystem.mappers;

import com.skillstorm.taxprepsystem.models.User;
import com.skillstorm.taxprepsystem.models.UserDto;
import org.springframework.stereotype.Component;

/**
 * Mapper class to convert User object to UserDto object.
 */
@Component
public class UserMapper {
    public UserDto toDto(User user){
        return new UserDto(user.getSocial(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getPhone(), user.getStreetAddr(), user.getCity(), user.getState(), user.getZip(), user.getStatus());
    }
}
