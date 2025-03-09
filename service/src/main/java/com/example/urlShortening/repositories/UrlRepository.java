package com.example.urlShortening.repositories;

import com.example.urlShortening.models.Url;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UrlRepository extends JpaRepository<Url, UUID> {
    Optional<Url> findByShortUrl(String shortUrl);
    List<Url> findByUserId(UUID userId);
    Optional<Url> findByLongUrl(String longUrl);

}