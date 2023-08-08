package com.skillstorm.taxprepsystem.payload;

public class AuthResponse {
    private String accessToken;
    private long ssn;
    private String firstName;
    private String lastName;
    private String tokenType = "Bearer ";

    public AuthResponse() {
    }

    public AuthResponse(String accessToken, long ssn, String firstName, String lastName) {
        this.accessToken = accessToken;
        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
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
