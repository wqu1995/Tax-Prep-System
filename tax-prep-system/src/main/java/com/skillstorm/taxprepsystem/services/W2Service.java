package com.skillstorm.taxprepsystem.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.taxprepsystem.models.W2;
import com.skillstorm.taxprepsystem.models.W2Id;
import com.skillstorm.taxprepsystem.repositories.W2Repository;

@Service
public class W2Service {

    @Autowired
    private W2Repository w2Repository;

    public List<W2> findAllBySocial(long social) {
        return w2Repository.findByW2IdSocial(social);
    }
    
    public W2 saveNewW2(W2 w2) {
        List<W2> allW2 = w2Repository.findAll();
        for (W2 currentW2: allW2) {
            if (currentW2.getW2Id().equals(w2.getW2Id())) {                 // If the W2 already exists, don't create a new one
                return null;
            }
        }

        return w2Repository.save(w2);
    }

    public W2 updateW2(W2 w2) {
        List<W2> allW2 = w2Repository.findAll();
        for (W2 currentW2: allW2) {
            if (currentW2.getW2Id().equals(w2.getW2Id())) {                // Check if the W2 exists before updating to avoid creating a new W2

                return w2Repository.save(w2);                              // If it exists, update it
            }
        }

        return null;                                                      // If it doesn't, do nothing

    }

    public void deleteBySocial(long social) {
        w2Repository.deleteAllByW2IdSocial(social);
    }

    public void deleteByW2Id(long social, long empTin) {
        
        w2Repository.deleteAllByW2Id(new W2Id(social, empTin));
    }
}
