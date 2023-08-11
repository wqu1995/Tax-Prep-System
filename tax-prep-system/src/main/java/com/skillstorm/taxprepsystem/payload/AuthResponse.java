package com.skillstorm.taxprepsystem.payload;

/**
 * Response object template for Authentication related request.
 */
public class AuthResponse {
    private long ssn;
    private String firstName;
    private String lastName;

    public AuthResponse() {
    }

    public AuthResponse(long ssn, String firstName, String lastName) {
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

}
