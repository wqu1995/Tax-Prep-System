package com.skillstorm.taxprepsystem.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * model for user entity.
 */
@Document(collection = "users")
public class User implements UserDetails{

    @Id
    private long social;

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private long phone;

    private String streetAddr;

    private String city;

    private String state;

    private int zip;

    private String status;

    private String role;

    public User() {
    }

    public User(long social, String email, String password, String role) {
        this.social = social;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public User(long social, String firstName, String lastName, String email, String password, long phone, String streetAddr, String city, String state, int zip, String status, String role) {
        this.social = social;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.streetAddr = streetAddr;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.status = status;
        this.role = role;
    }

    public User(long social, String firstName, String lastName, long phone, String streetAddr, String city, String state, int zip, String status) {
        this.social = social;
        this.firstName = firstName;
        this.lastName = lastName;
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
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        SimpleGrantedAuthority userRole = new SimpleGrantedAuthority(this.role);
        authorities.add(userRole);
        return authorities;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return social == user.social && phone == user.phone && zip == user.zip && Objects.equals(firstName, user.firstName) && Objects.equals(lastName, user.lastName) && Objects.equals(email, user.email) && Objects.equals(password, user.password) && Objects.equals(streetAddr, user.streetAddr) && Objects.equals(city, user.city) && Objects.equals(state, user.state) && Objects.equals(status, user.status) && Objects.equals(role, user.role);
    }

    @Override
    public int hashCode() {
        return Objects.hash(social, firstName, lastName, email, password, phone, streetAddr, city, state, zip, status, role);
    }

    @Override
    public String toString() {
        return "User{" +
                "social=" + social +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", phone=" + phone +
                ", streetAddr='" + streetAddr + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", zip=" + zip +
                ", status='" + status + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
