package com.skillstorm.taxprepsystem.models;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "ten99s")
public class Ten99 {
    
    @Id
    private Ten99Id ten99Id;

    private double wages;

    private double fedWithheld;

    public Ten99() {
    }

    public Ten99(Ten99Id ten99Id, double wages, double fedWithheld) {
        this.ten99Id = ten99Id;
        this.wages = wages;
        this.fedWithheld = fedWithheld;
    }

    public Ten99Id getTen99Id() {
        return ten99Id;
    }

    public void setTen99Id(Ten99Id ten99Id) {
        this.ten99Id = ten99Id;
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

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((ten99Id == null) ? 0 : ten99Id.hashCode());
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
        Ten99 other = (Ten99) obj;
        if (ten99Id == null) {
            if (other.ten99Id != null)
                return false;
        } else if (!ten99Id.equals(other.ten99Id))
            return false;
        if (Double.doubleToLongBits(wages) != Double.doubleToLongBits(other.wages))
            return false;
        if (Double.doubleToLongBits(fedWithheld) != Double.doubleToLongBits(other.fedWithheld))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Ten99 [ten99Id=" + ten99Id + ", wages=" + wages + ", fedWithheld=" + fedWithheld + "]";
    }

    
    
}
