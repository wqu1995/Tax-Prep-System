package com.skillstorm.taxprepsystem.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    /**
     * Find all w2 associated with ssn.
     *
     * @param social the social
     * @return list of w2
     */
    public List<W2> findAllBySocial(long social) {
        return w2Repository.findAllBySocial(social);
    }

    /**
     * Save new w2 to database .
     *
     * @param w2 from request
     * @return the w2
     */
    public W2 saveNewW2(W2 w2) {
        Optional<User> user = userRepository.findBySocial(w2.getW2Id().getSocial());         // Check if the associated user exists
        if (!user.isPresent()) {                                                        // If user doesn't exist, return null
            return null;
        }

        return w2Repository.save(w2);
    }

    /**
     * Update w2
     *
     * @param w2 from request
     * @return the w 2
     */
    public W2 updateW2(W2 w2) {
        List<W2> allW2 = w2Repository.findAll();
        for (W2 currentW2: allW2) {
            if (currentW2.getW2Id().equals(w2.getW2Id())) {                // Check if the W2 exists before updating to avoid creating a new W2
                return w2Repository.save(w2);                              // If it exists, then update it
            }
        }

        return null;                                                      // If it doesn't, do nothing

    }

    /**
     * Delete all w2 associated with social.
     *
     * @param social the social
     */
    @Transactional
    public void deleteBySocial(long social) {
        w2Repository.deleteBySocial(social);
    }

    /**
     * Delete w2 associated with social and empTin.
     *
     * @param social the social
     * @param empTin the emp tin
     */
    @Transactional
    public void deleteByW2Id(long social, long empTin) {
        
        w2Repository.deleteAllByW2Id(new W2Id(social, empTin));
    }
}
