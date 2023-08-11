package com.skillstorm.taxprepsystem.models;

import java.io.Serializable;

/**
 * CLass for defining combined key for 1099 form.
 */
public class Ten99Id implements Serializable{
    
    private long social;

    private long payerTin;

    public Ten99Id() {
    }

    public Ten99Id(long social, long payerTin) {
        this.social = social;
        this.payerTin = payerTin;
    }

    public long getSocial() {
        return social;
    }

    public void setSocial(long social) {
        this.social = social;
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
        result = prime * result + (int) (social ^ (social >>> 32));
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
        if (social != other.social)
            return false;
        if (payerTin != other.payerTin)
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Ten99Id [social=" + social + ", payerTin=" + payerTin + "]";
    }

    
}
