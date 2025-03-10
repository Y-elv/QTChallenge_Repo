package com.example.urlShortening.services;

import com.example.urlShortening.dto.*;

import java.util.List;

import com.example.urlShortening.dto.request.AuthRequest;
import com.example.urlShortening.dto.response.AuthResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    ResponseEntity<ApiResponse<UserDto>> registerUser(UserDto userDto);
    ResponseEntity<ApiResponse<AuthResponse>> loginUser(AuthRequest authRequest);
    ResponseEntity<ApiResponse<List<UserDto>>> getAllUsers();
}