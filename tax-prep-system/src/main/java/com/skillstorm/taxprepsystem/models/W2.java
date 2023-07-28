package com.skillstorm.taxprepsystem.models;

import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "W2s")
public class W2 {
    
    @Id
    private W2Id w2Id;

    private double wages;

    private double fedWithheld;

    public W2() {
    }

    public W2(W2Id w2Id, double wages, double fedWithheld) {
        this.w2Id = w2Id;
        this.wages = wages;
        this.fedWithheld = fedWithheld;
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
