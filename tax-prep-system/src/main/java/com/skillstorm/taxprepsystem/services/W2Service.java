package com.skillstorm.taxprepsystem.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.taxprepsystem.models.User;
import com.skillstorm.taxprepsystem.models.W2;
import com.skillstorm.taxprepsystem.models.W2Id;
import com.skillstorm.taxprepsystem.repositories.UserRepository;
import com.skillstorm.taxprepsystem.repositories.W2Repository;

@Service
public class W2Service {

    @Autowired
    private W2Repository w2Repository;

    @Autowired
    private UserRepository userRepository;

    public List<W2> findAllBySocial(long social) {
        return w2Repository.findAllBySocial(social);
    }
    
    public W2 saveNewW2(W2 w2) {

        User user = userRepository.findBySocial(w2.getW2Id().getSocial());         // Check if the associated user exists
        if (user == null) {                                                        // If user doesn't exist, return null
            return null;
        }

        //w2.setUser(user);
        return w2Repository.save(w2);
    }

    public W2 updateW2(W2 w2) {
        List<W2> allW2 = w2Repository.findAll();
        for (W2 currentW2: allW2) {
            if (currentW2.getW2Id().equals(w2.getW2Id())) {                // Check if the W2 exists before updating to avoid creating a new W2
                //w2.setUser(currentW2.getUser());                           // If it exists, associate the update with the correct user
                return w2Repository.save(w2);                              // then update it
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
