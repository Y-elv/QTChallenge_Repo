package com.example.urlShortening.filter;

import com.example.urlShortening.util.JwtTokenUtil;
import jakarta.servlet.*;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import org.springframework.stereotype.Component; // Add this import for @Component

@Component // Add this annotation to register JwtAuthenticationFilter as a Spring Bean
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private JwtTokenUtil jwtTokenUtil;

    public JwtAuthenticationFilter(JwtTokenUtil jwtTokenUtil) {
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // Extract token

            String username = jwtTokenUtil.getUsernameFromToken(token);  // Extract username from the token
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                // Validate the token along with the username
                if (jwtTokenUtil.validateToken(token, username)) {
                    // Create authentication token if valid
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, null, null);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } else {
                    System.out.println("Invalid token or username mismatch.");
                }
            }
        }
        filterChain.doFilter(request, response);
    }

}
