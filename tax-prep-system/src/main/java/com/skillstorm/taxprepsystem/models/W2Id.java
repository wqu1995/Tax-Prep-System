package com.skillstorm.taxprepsystem.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Embeddable
public class W2Id implements Serializable{
    
    @ManyToOne
    @JoinColumn(name = "social")
    private User user;

    @Column(name = "emp_tin")
    private Long empTin;

    public W2Id() {
    }

    public W2Id(User user, Long empTin) {
        this.user = user;
        this.empTin = empTin;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getEmpTin() {
        return empTin;
    }

    public void setEmpTin(Long empTin) {
        this.empTin = empTin;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((user == null) ? 0 : user.hashCode());
        result = prime * result + ((empTin == null) ? 0 : empTin.hashCode());
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
        W2Id other = (W2Id) obj;
        if (user == null) {
            if (other.user != null)
                return false;
        } else if (!user.equals(other.user))
            return false;
        if (empTin == null) {
            if (other.empTin != null)
                return false;
        } else if (!empTin.equals(other.empTin))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "W2Id [user=" + user + ", empTin=" + empTin + "]";
    }

    
}
