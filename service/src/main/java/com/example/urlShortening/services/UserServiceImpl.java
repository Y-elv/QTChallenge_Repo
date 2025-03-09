package com.example.urlShortening.services;

import com.example.urlShortening.dto.*;
import com.example.urlShortening.dto.request.AuthRequest;
import com.example.urlShortening.dto.response.AuthResponse;
import com.example.urlShortening.exception.ResourceNotFoundException;
import com.example.urlShortening.models.User;
import com.example.urlShortening.repositories.UserRepository;
import com.example.urlShortening.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Override
    public ResponseEntity<ApiResponse<UserDto>> registerUser(UserDto userDto) {
        Optional<User> existingUser = userRepository.findByEmail(userDto.getEmail());
        if (existingUser.isPresent()) {
            throw new ResourceNotFoundException("User already exists with email: " + userDto.getEmail());
        }

        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        userRepository.save(user);

        return new ResponseEntity<>(new ApiResponse<>(true, "User registered successfully", userDto, LocalDateTime.now(), HttpStatus.CREATED.value()), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<ApiResponse<AuthResponse>> loginUser(AuthRequest authRequest) {
        User user = userRepository.findByEmail(authRequest.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + authRequest.getEmail()));

        if (!passwordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
            return new ResponseEntity<>(new ApiResponse<>(false, "Invalid credentials", null, LocalDateTime.now(), HttpStatus.UNAUTHORIZED.value()), HttpStatus.UNAUTHORIZED);
        }

        String token = jwtTokenUtil.generateToken(user.getUsername());

        return new ResponseEntity<>(new ApiResponse<>(true, "Login successful", new AuthResponse(token), LocalDateTime.now(), HttpStatus.OK.value()), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ApiResponse<List<UserDto>>> getAllUsers() {
        List<UserDto> users = userRepository.findAll().stream().map(user -> {
            //help me to remove password in response
            UserDto userDto = new UserDto();
            userDto.setUsername(user.getUsername());
            userDto.setEmail(user.getEmail());
            return userDto;
        }).collect(Collectors.toList());

        return new ResponseEntity<>(new ApiResponse<>(true, "Users retrieved successfully", users, LocalDateTime.now(), HttpStatus.OK.value()), HttpStatus.OK);
    }
}