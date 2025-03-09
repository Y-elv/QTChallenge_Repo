package com.example.urlShortening.controller;

import com.example.urlShortening.dto.*;
import com.example.urlShortening.services.TokenService;
import com.example.urlShortening.dto.request.AuthRequest;
import com.example.urlShortening.dto.response.AuthResponse;
import com.example.urlShortening.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final UserService userService;

    @Autowired
    private TokenService tokenService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserDto>> registerUser(@Valid @RequestBody UserDto userDto) {
        return userService.registerUser(userDto);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> loginUser(@Valid @RequestBody AuthRequest authRequest) {
        return userService.loginUser(authRequest);
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(@RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        tokenService.invalidateToken(token);
        return ResponseEntity.ok(ApiResponse.success("Logout successful", null));
    }
}