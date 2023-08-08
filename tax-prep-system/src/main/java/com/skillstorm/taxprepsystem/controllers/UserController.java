package com.skillstorm.taxprepsystem.controllers;

import com.skillstorm.taxprepsystem.models.User;
import com.skillstorm.taxprepsystem.models.UserDto;
import com.skillstorm.taxprepsystem.payload.AuthResponse;
import com.skillstorm.taxprepsystem.payload.LoginRequest;
import com.skillstorm.taxprepsystem.security.JWTGenerator;
import com.skillstorm.taxprepsystem.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTGenerator jwtGenerator;


    /**
     * Handler for GET request ("/users").
     *
     * @return the response entity
     */
    @GetMapping
    public ResponseEntity<List<User>> findAllUsers(){
        List<User> results = userService.findAllUsers();

        if(!results.isEmpty()){
            return new ResponseEntity<>(results, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

    }

    /**
     * Handler for GET request ("/users/user/{social}").
     *
     * @param social the social
     * @return the response entity
     */
    @GetMapping("/user/{social}")
    public ResponseEntity<UserDto> findUserBySocial(@PathVariable long social){
        UserDto result = userService.findUserBySocial(social);

        if(result != null){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    /**
     * Handler for POST request("/users/newUser").
     *
     * @param userData the user data
     * @return the response entity
     */
    @PostMapping("/newUser")
    public ResponseEntity<?> addNewUser(@RequestBody User userData){
        return userService.addNewUser(userData);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        long ssn = getSocial(loginRequest.getUsername());
        if(ssn != -1){
            String token = jwtGenerator.generateToken(authentication);
            return ResponseEntity.ok().body(new AuthResponse(token, ssn));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }

    /**
     * Handler for PUT request("/users/updateUser").
     *
     * @param userData the user data
     * @return the response entity
     */
    @PutMapping("/updateUser")
    public ResponseEntity<?> updateUser(@RequestBody User userData){
        return userService.updateUser(userData);
    }

    /**
     * Handler for DELETE request("/users/deleteUser{social}").
     *
     * @param social the social
     * @return the response entity
     */
    @DeleteMapping("/deleteUser/{social}")
    public ResponseEntity<Integer> deleteUser(@PathVariable Long social){
        int result = userService.deleteUser(social);

        if(result != 0){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    private long getSocial(String username){
        return userService.getSocial(username);
    }


}
