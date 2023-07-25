package com.skillstorm.taxprepsystem.controllers;

import com.skillstorm.taxprepsystem.models.User;
import com.skillstorm.taxprepsystem.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

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
    public ResponseEntity<User> findUserBySocial(@PathVariable long social){
        User result = userService.findUserBySocial(social);

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
    public ResponseEntity<User> addNewUser(@RequestBody User userData){
        User result = userService.addNewUser(userData);

        if(result != null){
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    /**
     * Handler for PUT request("/users/updateUser").
     *
     * @param userData the user data
     * @return the response entity
     */
    @PutMapping("/updateUser")
    public ResponseEntity<User> updateUser(@RequestBody User userData){
        User result = userService.updateUser(userData);
        if(result != null){
            return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
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
}
