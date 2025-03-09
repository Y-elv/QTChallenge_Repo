package com.example.urlShortening.filter;

import com.example.urlShortening.exception.CustomException;
import com.example.urlShortening.exception.ErrorResponse;
import com.example.urlShortening.services.TokenService;
import com.example.urlShortening.util.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private TokenService tokenService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        try {
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                jwt = authorizationHeader.substring(7);
                if (tokenService.isTokenInvalid(jwt)) {
                    throw new CustomException("Invalid JWT token", HttpStatus.UNAUTHORIZED);
                }
                username = jwtTokenProvider.extractUsername(jwt);
            }

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                if (jwtTokenProvider.validateToken(jwt)) {
                    UserDetails userDetails = (UserDetails) jwtTokenProvider.getAuthentication(jwt).getPrincipal();
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
            chain.doFilter(request, response);
        } catch (CustomException ex) {
            setErrorResponse(request, response, ex.getStatus(), ex.getMessage());
        } catch (Exception ex) {
            setErrorResponse(request, response, HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred while processing the JWT token");
        }
    }

    private void setErrorResponse(HttpServletRequest request, HttpServletResponse response, HttpStatus status, String message) throws IOException {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .success(false)
                .message(message)
                .timestamp(LocalDateTime.now())
                .statusCode(status.value())
                .error(status.getReasonPhrase())
                .path(request.getRequestURI())
                .build();
        response.setStatus(status.value());
        response.setContentType("application/json");
        response.getWriter().write(errorResponse.toString());
    }
}