package com.skillstorm.taxprepsystem.services;

import com.skillstorm.taxprepsystem.mappers.UserMapper;
import com.skillstorm.taxprepsystem.models.User;
import com.skillstorm.taxprepsystem.models.UserDto;
import com.skillstorm.taxprepsystem.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserMapper userMapper;



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
    public UserDto findUserBySocial(long social) {

        User user = userRepository.findById(social).orElse(null);
        if(user!=null){
            return userMapper.toDto(user);
        }
        return null;

    }

    /**
     * Add new user to the User table.
     *
     * @param userData the user data
     * @return the user
     */
    public ResponseEntity<Object> addNewUser(User userData) {
        if(userRepository.findByEmail(userData.getUsername()).isPresent()){
            return ResponseEntity.badRequest().body("Email already exist!");
        }else if(userRepository.findById(userData.getSocial()).isPresent()){
            return ResponseEntity.badRequest().body("Account associated with this SSN already exist!");
        }else{
            userData.setPassword(passwordEncoder.encode(userData.getPassword()));
            userData.setRole("ROLE_USER");
            userRepository.save(userData);
        }


        return ResponseEntity.ok().body(new UserDto(userData.getSocial(), userData.getUsername()));
    }

    /**
     * Update existing user data that matches the ssn.
     *
     * @param userData the user data
     * @return the user
     */
    public ResponseEntity<Object> updateUser(User userData) {
        //probably need to rewrite this method to be more specific
        User user = userRepository.findBySocial(userData.getSocial()).orElse(null);
        if(user==null){
            return ResponseEntity.badRequest().body("User does not exist!");
        }else{
            user.setFirstName(userData.getFirstName());
            user.setLastName(userData.getLastName());
            user.setPhone(userData.getPhone());
            user.setStreetAddr(userData.getStreetAddr());
            user.setCity(userData.getCity());
            user.setState(userData.getState());
            user.setZip(userData.getZip());
            user.setStatus(userData.getStatus());

            userRepository.save(user);
        }
        return ResponseEntity.ok().body(userMapper.toDto(user));
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

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username).orElseThrow(()-> new UsernameNotFoundException(username+ " not found!"));
        //System.out.println(user.getUsername());
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), user.getAuthorities());
    }


    public long getSocial(String username) {
        User user = userRepository.findByEmail(username).orElse(null);
        if(user!= null){
            return user.getSocial();
        }
        return -1;
    }
}
