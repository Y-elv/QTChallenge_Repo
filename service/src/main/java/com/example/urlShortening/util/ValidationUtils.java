package com.example.urlShortening.util;

import com.example.urlShortening.exception.CustomException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.regex.Pattern;

@Component
public class ValidationUtils {

    private static final String EMAIL_REGEX = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
    private static final Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);

    private static final String USERNAME_REGEX = "^[a-zA-Z0-9_]{3,20}$";
    private static final Pattern USERNAME_PATTERN = Pattern.compile(USERNAME_REGEX);

    private static final int MIN_PASSWORD_LENGTH = 8;

    public void validateEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            throw new CustomException("Email cannot be empty", HttpStatus.BAD_REQUEST);
        }

        if (!EMAIL_PATTERN.matcher(email).matches()) {
            throw new CustomException("Invalid email format", HttpStatus.BAD_REQUEST);
        }
    }

    public void validateUsername(String username) {
        if (username == null || username.trim().isEmpty()) {
            throw new CustomException("Username cannot be empty", HttpStatus.BAD_REQUEST);
        }

        if (!USERNAME_PATTERN.matcher(username).matches()) {
            throw new CustomException("Username must be 3-20 characters long and can only contain letters, numbers, and underscores", HttpStatus.BAD_REQUEST);
        }
    }

    public void validatePassword(String password) {
        if (password == null || password.trim().isEmpty()) {
            throw new CustomException("Password cannot be empty", HttpStatus.BAD_REQUEST);
        }

        if (password.length() < MIN_PASSWORD_LENGTH) {
            throw new CustomException("Password must be at least " + MIN_PASSWORD_LENGTH + " characters long", HttpStatus.BAD_REQUEST);
        }

        boolean hasUppercase = !password.equals(password.toLowerCase());
        boolean hasLowercase = !password.equals(password.toUpperCase());
        boolean hasDigit = password.matches(".*\\d.*");
        boolean hasSpecialChar = !password.matches("[A-Za-z0-9]*");

        if (!(hasUppercase && hasLowercase && hasDigit && hasSpecialChar)) {
            throw new CustomException("Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character", HttpStatus.BAD_REQUEST);
        }
    }
}