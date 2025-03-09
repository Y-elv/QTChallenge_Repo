// TokenInfo.java
package com.example.urlShortening.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TokenInfo {
    private String userId;
    private String username;
    private String email;
    private boolean isExpired;
}