package com.skillstorm.taxprepsystem.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Embeddable
public class Ten99Id implements Serializable{
    
    @ManyToOne
    @JoinColumn(name = "social")
    private User user;

    @Column(name = "payer_tin")
    private long payerTin;

    public Ten99Id() {
    }

    public Ten99Id(User user, long payerTin) {
        this.user = user;
        this.payerTin = payerTin;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public long getPayerTin() {
        return payerTin;
    }

    public void setPayerTin(long payerTin) {
        this.payerTin = payerTin;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((user == null) ? 0 : user.hashCode());
        result = prime * result + (int) (payerTin ^ (payerTin >>> 32));
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Ten99Id other = (Ten99Id) obj;
        if (user == null) {
            if (other.user != null)
                return false;
        } else if (!user.equals(other.user))
            return false;
        if (payerTin != other.payerTin)
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Ten99Id [user=" + user + ", payerTin=" + payerTin + "]";
    }

    
}
