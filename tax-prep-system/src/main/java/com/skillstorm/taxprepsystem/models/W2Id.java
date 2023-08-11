package com.skillstorm.taxprepsystem.models;

import java.io.Serializable;

/**
 * CLass for defining combined key for w2 form.
 */
public class W2Id implements Serializable{
    

    private long social;

    private long empTin;

    public W2Id() {
    }

    public W2Id(long social, long empTin) {
        this.social = social;
        this.empTin = empTin;
    }

    public long getSocial() {
        return social;
    }

    public void setSocial(long social) {
        this.social = social;
    }

    public long getEmpTin() {
        return empTin;
    }

    public void setEmpTin(long empTin) {
        this.empTin = empTin;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (int) (social ^ (social >>> 32));
        result = prime * result + (int) (empTin ^ (empTin >>> 32));
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
        if (social != other.social)
            return false;
        if (empTin != other.empTin)
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "W2Id [social=" + social + ", empTin=" + empTin + "]";
    }

    
}
