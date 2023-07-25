package com.skillstorm.taxprepsystem.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

    @Id
    @Column
    private long social;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column
    private String email;

    @Column
    private String password;

    @Column
    private long phone;

    @Column(name = "street_addr")
    private String streetAddr;

    @Column
    private String city;

    @Column
    private String state;

    @Column
    private int zip;

    @Column
    private String status;

    @OneToMany(targetEntity = W2.class, mappedBy = "user")
    private Set<W2> W2s;

    @OneToMany(targetEntity = Ten99.class, mappedBy = "user")
    private Set<Ten99> ten99s;


    public User() {
    }

    public User(long social, String firstName, String lastName, String email, String password, long phone, String streetAddr, String city, String state, int zip, String status) {
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return social == user.social && phone == user.phone && zip == user.zip && status.equals(user.status) && Objects.equals(firstName, user.firstName) && Objects.equals(lastName, user.lastName) && Objects.equals(email, user.email) && Objects.equals(password, user.password) && Objects.equals(streetAddr, user.streetAddr) && Objects.equals(city, user.city) && Objects.equals(state, user.state);
    }

    @Override
    public int hashCode() {
        return Objects.hash(social, firstName, lastName, email, password, phone, streetAddr, city, state, zip, status);
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
                ", status=" + status +
                '}';
    }
}
