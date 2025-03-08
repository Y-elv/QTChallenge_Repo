package com.example.urlShortening.models;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;
import jakarta.persistence.*;

@Entity
@Table(name = "urls")
@Data
@NoArgsConstructor
public class Url {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String longUrl;

    @Column(nullable = false, unique = true)
    private String shortUrl;

    @Column(nullable = false)
    private int clickCount = 0;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // Ensure User is an @Entity and properly imported.
}
