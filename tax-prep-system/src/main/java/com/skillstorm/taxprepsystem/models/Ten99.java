package com.skillstorm.taxprepsystem.models;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "1099")
public class Ten99 {
    
    @EmbeddedId
    private Ten99Id ten99Id;

    @Column
    private double compensation;

    @Column(name = "fed_withheld")
    private double fedWithheld;

    public Ten99() {
    }

    public Ten99(Ten99Id ten99Id, double compensation, double fedWithheld) {
        this.ten99Id = ten99Id;
        this.compensation = compensation;
        this.fedWithheld = fedWithheld;
    }

    public Ten99Id getTen99Id() {
        return ten99Id;
    }

    public void setTen99Id(Ten99Id ten99Id) {
        this.ten99Id = ten99Id;
    }

    public double getCompensation() {
        return compensation;
    }

    public void setCompensation(double compensation) {
        this.compensation = compensation;
    }

    public double getFedWithheld() {
        return fedWithheld;
    }

    public void setFedWithheld(double fedWithheld) {
        this.fedWithheld = fedWithheld;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((ten99Id == null) ? 0 : ten99Id.hashCode());
        long temp;
        temp = Double.doubleToLongBits(compensation);
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
        Ten99 other = (Ten99) obj;
        if (ten99Id == null) {
            if (other.ten99Id != null)
                return false;
        } else if (!ten99Id.equals(other.ten99Id))
            return false;
        if (Double.doubleToLongBits(compensation) != Double.doubleToLongBits(other.compensation))
            return false;
        if (Double.doubleToLongBits(fedWithheld) != Double.doubleToLongBits(other.fedWithheld))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Ten99 [ten99Id=" + ten99Id + ", compensation=" + compensation + ", fedWithheld=" + fedWithheld + "]";
    }
    
    
}
