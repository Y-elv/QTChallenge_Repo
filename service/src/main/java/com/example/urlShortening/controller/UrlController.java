package com.example.urlShortening.controller;

import com.example.urlShortening.dto.ApiResponse;
import com.example.urlShortening.dto.request.UrlRequest;
import com.example.urlShortening.models.Url;
import com.example.urlShortening.services.UrlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/urls")
public class UrlController {

    @Autowired
    private UrlService urlService;

    @PostMapping("/shorten")
    public ResponseEntity<ApiResponse<Url>> shortenUrl(
            @RequestHeader("Authorization") String authorizationHeader,
            @Valid @RequestBody UrlRequest urlRequest) {
        return urlService.shortenUrl(urlRequest, authorizationHeader.substring(7));
    }

    @GetMapping("/{shortUrl}")
    public ResponseEntity<ApiResponse<Url>> getUrl(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable String shortUrl) {
        return urlService.getUrl(shortUrl, authorizationHeader.substring(7));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Url>>> getAllUrls(
            @RequestHeader("Authorization") String authorizationHeader) {
        return urlService.getAllUrls(authorizationHeader.substring(7));
    }
}