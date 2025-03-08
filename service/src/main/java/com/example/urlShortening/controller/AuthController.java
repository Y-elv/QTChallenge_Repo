package com.example.urlShortening.controller;

import com.example.urlShortening.models.User;
import com.example.urlShortening.util.JwtTokenUtil;
import com.example.urlShortening.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginUser) {
        // Find the user by username/email, validate the password, and generate a JWT token
        String token = userService.login(loginUser);
        return ResponseEntity.ok("Bearer " + token);
    }

    // Register endpoint
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public User register(@RequestBody User newUser) {
        return userService.register(newUser);  // Calls the service method for registration
    }
}
