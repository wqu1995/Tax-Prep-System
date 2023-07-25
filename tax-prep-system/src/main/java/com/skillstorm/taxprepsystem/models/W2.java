package com.skillstorm.taxprepsystem.models;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "w2")
public class W2 {
    
    @EmbeddedId
    private W2Id w2Id;

    @Column
    private double wages;

    @Column(name = "fed_withheld")
    private double fedWithheld;

    @ManyToOne
    @MapsId("social")
    @JsonBackReference
    @JoinColumn(name = "social")
    private User user;

    public W2() {
    }

    public W2(W2Id w2Id, double wages, double fedWithheld) {
        this.w2Id = w2Id;
        this.wages = wages;
        this.fedWithheld = fedWithheld;
    }

    

    public W2(W2Id w2Id, double wages, double fedWithheld, User user) {
        this.w2Id = w2Id;
        this.wages = wages;
        this.fedWithheld = fedWithheld;
        this.user = user;
    }

    

    public W2Id getW2Id() {
        return w2Id;
    }

    public void setW2Id(W2Id w2Id) {
        this.w2Id = w2Id;
    }

    public double getWages() {
        return wages;
    }

    public void setWages(double wages) {
        this.wages = wages;
    }

    public double getFedWithheld() {
        return fedWithheld;
    }

    public void setFedWithheld(double fedWithheld) {
        this.fedWithheld = fedWithheld;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((w2Id == null) ? 0 : w2Id.hashCode());
        long temp;
        temp = Double.doubleToLongBits(wages);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(fedWithheld);
        result = prime * result + (int) (temp ^ (temp >>> 32));
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
        W2 other = (W2) obj;
        if (w2Id == null) {
            if (other.w2Id != null)
                return false;
        } else if (!w2Id.equals(other.w2Id))
            return false;
        if (Double.doubleToLongBits(wages) != Double.doubleToLongBits(other.wages))
            return false;
        if (Double.doubleToLongBits(fedWithheld) != Double.doubleToLongBits(other.fedWithheld))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "W2 [w2Id=" + w2Id + ", wages=" + wages + ", fedWithheld=" + fedWithheld + "]";
    }


    

}
