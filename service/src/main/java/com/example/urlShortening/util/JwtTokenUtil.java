package com.example.urlShortening.util;

import com.example.urlShortening.exception.CustomException;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Slf4j
@Component
public class JwtTokenUtil {

    @Value("${JWT_SECRET}")
    private String secretKey;

    @Value("${JWT_EXPIRATION}")
    private long jwtExpiration;

    @Value("${jwt.refresh-token.expiration}")
    private long refreshExpiration;


    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
        } catch (SignatureException ex) {
            log.error("Invalid JWT signature");
            throw new CustomException("Invalid JWT signature", HttpStatus.UNAUTHORIZED);
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
            throw new CustomException("Invalid JWT token", HttpStatus.UNAUTHORIZED);
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");
            throw new CustomException("Expired JWT token", HttpStatus.UNAUTHORIZED);
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");
            throw new CustomException("Unsupported JWT token", HttpStatus.UNAUTHORIZED);
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty");
            throw new CustomException("JWT claims string is empty", HttpStatus.UNAUTHORIZED);
        }
    }



    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(String userId, String email, String username) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        claims.put("email", email);
        claims.put("username", username);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }




}