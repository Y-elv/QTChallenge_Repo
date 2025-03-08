package com.example.urlShortening.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.urlShortening.models.User;
import com.example.urlShortening.repositories.UserRepository;
import com.example.urlShortening.util.JwtTokenUtil;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;  // Autowire the PasswordEncoder

    public String authenticateUser(String email, String password) {
        // Log the email and password for debugging (Optional)
        System.out.println("Attempting to authenticate with email: " + email + " and password: " + password);

        // Find the user by email
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Check if the provided password matches the stored password
            boolean passwordMatches = passwordEncoder.matches(password, user.getPassword());
            if (passwordMatches) {
                // Generate and return the JWT token if the password matches
                System.out.println("Password matches for user: " + user.getEmail()); // Debugging line
                return jwtTokenUtil.generateToken(user);  // Generate token using the user object
            } else {
                System.out.println("Invalid password for user: " + user.getEmail()); // Debugging line
            }
        } else {
            System.out.println("No user found with email: " + email); // Debugging line
        }

        // If no user is found or password does not match, throw an exception
        throw new RuntimeException("Invalid email or password");
    }
}
