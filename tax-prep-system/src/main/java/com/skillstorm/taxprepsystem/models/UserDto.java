package com.skillstorm.taxprepsystem.models;


import java.util.Objects;

public class UserDto {
    private long social;

    private String firstName;

    private String lastName;

    private String email;

    private long phone;

    private String streetAddr;

    private String city;

    private String state;

    private int zip;

    private String status;

    public UserDto() {
    }

    public UserDto(long social, String email) {
        this.social = social;
        this.email = email;
    }

    public UserDto(long social, String firstName, String lastName, String email, long phone, String streetAddr, String city, String state, int zip, String status) {
        this.social = social;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.streetAddr = streetAddr;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.status = status;
    }

    public long getSocial() {
        return social;
    }

    public void setSocial(long social) {
        this.social = social;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public long getPhone() {
        return phone;
    }

    public void setPhone(long phone) {
        this.phone = phone;
    }

    public String getStreetAddr() {
        return streetAddr;
    }

    public void setStreetAddr(String streetAddr) {
        this.streetAddr = streetAddr;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public int getZip() {
        return zip;
    }

    public void setZip(int zip) {
        this.zip = zip;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserDto userDTO = (UserDto) o;
        return social == userDTO.social && phone == userDTO.phone && zip == userDTO.zip && Objects.equals(firstName, userDTO.firstName) && Objects.equals(lastName, userDTO.lastName) && Objects.equals(email, userDTO.email) && Objects.equals(streetAddr, userDTO.streetAddr) && Objects.equals(city, userDTO.city) && Objects.equals(state, userDTO.state) && Objects.equals(status, userDTO.status);
    }

    @Override
    public int hashCode() {
        return Objects.hash(social, firstName, lastName, email, phone, streetAddr, city, state, zip, status);
    }

    @Override
    public String toString() {
        return "UserDto{" +
                "social=" + social +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", phone=" + phone +
                ", streetAddr='" + streetAddr + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", zip=" + zip +
                ", status='" + status + '\'' +
                '}';
    }
}
