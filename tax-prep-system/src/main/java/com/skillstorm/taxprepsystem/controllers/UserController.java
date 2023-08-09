package com.skillstorm.taxprepsystem.controllers;

import com.skillstorm.taxprepsystem.models.User;
import com.skillstorm.taxprepsystem.models.UserDto;
import com.skillstorm.taxprepsystem.payload.AuthResponse;
import com.skillstorm.taxprepsystem.payload.LoginRequest;
import com.skillstorm.taxprepsystem.security.JWTGenerator;
import com.skillstorm.taxprepsystem.security.SecurityConstants;
import com.skillstorm.taxprepsystem.services.UserService;
import jdk.nashorn.internal.parser.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
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
    @PostMapping("/register")
    public ResponseEntity<?> addNewUser(@RequestBody User userData){
        String pass = userData.getPassword();
        HttpHeaders responseHeaders = new HttpHeaders();
        ResponseEntity<?> response = userService.addNewUser(userData);

        if(response.getStatusCode()!=HttpStatus.BAD_REQUEST){
            String token = getToken(userData.getEmail(), pass);
            addAccessTokenCookie(responseHeaders, token);
            return ResponseEntity.ok().headers(responseHeaders).body(new AuthResponse(userData.getSocial(), userData.getFirstName(), userData.getLastName()));
        }else{
            return response;
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@CookieValue(name = "test-cookie", required = false) String accessToken, @RequestBody LoginRequest loginRequest){
        String username;
        HttpHeaders responseHeaders = new HttpHeaders();

        if(loginRequest.getUsername()!=null && loginRequest.getPassword()!=null){
            username = loginRequest.getUsername();
            User user = getUser(username);
            if(user != null){
                String token = getToken(loginRequest.getUsername(), loginRequest.getPassword());
                addAccessTokenCookie(responseHeaders, token);
                return ResponseEntity.ok().headers(responseHeaders).body(new AuthResponse(user.getSocial(), user.getFirstName(), user.getLastName()));
            }
        }else{
            username = jwtGenerator.getUsernameFromJWT(accessToken);
            System.out.println(username);
            User user = getUser(username);
            if(user != null){
                return ResponseEntity.ok().body(new AuthResponse(user.getSocial(), user.getFirstName(), user.getLastName()));
            }

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

    private User getUser(String username){
        return userService.getUser(username);
    }

    private String getToken(String username, String password){
        System.out.println(username+" "+ password);
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return jwtGenerator.generateToken(authentication);
    }

    private void addAccessTokenCookie(HttpHeaders httpHeaders, String token){
        httpHeaders.add(HttpHeaders.SET_COOKIE, createAccessCookie(token).toString());
    }
    private HttpCookie createAccessCookie(String token){
        return ResponseCookie.from("test-cookie", token).httpOnly(true).path("/").maxAge(SecurityConstants.JWT_EXPIRATION).build();
    }
}
