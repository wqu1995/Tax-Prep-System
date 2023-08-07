package com.skillstorm.taxprepsystem.payload;

public class AuthResponse {
    private String accessToken;
    private long ssn;
    private String tokenType = "Bearer ";

    public AuthResponse() {
    }

    public AuthResponse(String accessToken, long ssn) {
        this.accessToken = accessToken;
        this.ssn = ssn;
    }

    public long getSsn() {
        return ssn;
    }

    public void setSsn(long ssn) {
        this.ssn = ssn;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }
}
