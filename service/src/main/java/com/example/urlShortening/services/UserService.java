package com.example.urlShortening.services;

import com.example.urlShortening.models.User;
import com.example.urlShortening.repositories.UserRepository;
import com.example.urlShortening.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public String login(User loginUser) {
        // Log the attempt to log in with email (password should never be logged for security reasons)
        System.out.println("Attempting login with email: " + loginUser.getEmail());

        // Find the user by email
        Optional<User> userOptional = userRepository.findByEmail(loginUser.getEmail());
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Log user details excluding sensitive information like password
            System.out.println("User found with email: " + user.getEmail() + ", User ID: " + user.getId());

            // Check if the provided password matches the stored password
            boolean passwordMatches = passwordEncoder.matches(loginUser.getPassword(), user.getPassword());
            System.out.println("Password match result for email " + user.getEmail() + ": " + passwordMatches);

            if (passwordMatches) {
                // Generate and return the JWT token if the password matches
                String token = jwtTokenUtil.generateToken(user);
                System.out.println("JWT Token generated successfully for user: " + user.getEmail());
                return token;
            } else {
                // Log failed password attempt
                System.out.println("Invalid password for user: " + user.getEmail());
            }
        } else {
            // Log when no user is found with the provided email
            System.out.println("No user found with email: " + loginUser.getEmail());
        }

        // If no user is found or password does not match, throw an exception
        throw new RuntimeException("Invalid email or password");
    }


    // Register method to create a new user
    public User register(User newUser) {
        // Check if the username or email already exists in the database
        Optional<User> existingUserByUsername = userRepository.findByUsername(newUser.getUsername());
        Optional<User> existingUserByEmail = userRepository.findByEmail(newUser.getEmail());

        if (existingUserByUsername.isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        if (existingUserByEmail.isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // Encode the user's password before saving
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));

        // Set createdAt time
        newUser.setCreatedAt(java.time.LocalDateTime.now());

        // Save the new user to the database
        return userRepository.save(newUser);
    }

}
