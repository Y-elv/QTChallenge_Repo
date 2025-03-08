package com.example.urlShortening.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import com.example.urlShortening.models.User;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenUtil {

    @Value("${jwt.secret}")
    private String secretKey;  // Inject the secret key from application properties

    @Value("${jwt.expiration}")
    private long expirationTime;


    Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // Method to generate a JWT token, keeping the original method signature
    public String generateToken(User user) {
        try {

            System.out.println("Secret key: " + secretKey);
            System.out.println("Expiration time: " + expirationTime);
            // Extract user details from the 'user' object
            String userId = String.valueOf(user.getId());
            String email = user.getEmail();
            String username = user.getUsername();

            // Build the JWT token with the user details in the payload
            return Jwts.builder()
                    .claim("userId", userId)         // Add user ID to the payload
                    .claim("email", email)           // Add email to the payload
                    .claim("username", username)     // Add username to the payload
                    .signWith(key)                   // Sign with the secure key
                    .compact();
        } catch (Exception e) {
            System.out.println("Error generating token: " + e.getMessage());
            throw new RuntimeException("Error generating JWT token", e);
        }
    }

    // Validate token and check if the username matches
    public boolean validateToken(String token, String username) {
        try {


            Claims claims = Jwts.parser()
                    .setSigningKey(key)
                    .parseClaimsJws(token)
                    .getBody();

            String tokenUsername = claims.get("username", String.class); // Extract username
            return tokenUsername.equals(username) && !isTokenExpired(token);
        } catch (ExpiredJwtException e) {
            System.out.println("Token expired: " + e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.out.println("Unsupported token: " + e.getMessage());
        } catch (MalformedJwtException e) {
            System.out.println("Malformed token: " + e.getMessage());
        } catch (SignatureException e) {
            System.out.println("Invalid signature: " + e.getMessage());
        } catch (JwtException e) {
            System.out.println("Token validation failed: " + e.getMessage());
        }

        return false;
    }

    // Extract username from the token
    public String getUsernameFromToken(String token) {
        return getClaimsFromToken(token).get("username", String.class);
    }

    // Extract userId from the token
    public String getUserIdFromToken(String token) {
        return getClaimsFromToken(token).get("userId", String.class);
    }

    // Extract email from the token
    public String getEmailFromToken(String token) {
        return getClaimsFromToken(token).get("email", String.class);
    }

    // Extract claims from the token
    private Claims getClaimsFromToken(String token) {
        try {


            return Jwts.parser()
                    .setSigningKey(key)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (JwtException e) {
            System.out.println("Error extracting claims from token: " + e.getMessage());
            throw new RuntimeException("Failed to extract claims from token", e);
        }
    }

    // Check if the token is expired
    private boolean isTokenExpired(String token) {
        Date expirationDate = getClaimsFromToken(token).getExpiration();
        return expirationDate.before(new Date());
    }
}
