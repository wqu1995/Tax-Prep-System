package com.skillstorm.taxprepsystem.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.taxprepsystem.models.Ten99;
import com.skillstorm.taxprepsystem.models.Ten99Id;
import com.skillstorm.taxprepsystem.models.User;
import com.skillstorm.taxprepsystem.repositories.Ten99Repository;
import com.skillstorm.taxprepsystem.repositories.UserRepository;

@Service
public class Ten99Service {

    @Autowired
    private Ten99Repository ten99Repository;

    @Autowired
    private UserRepository userRepository;

    public List<Ten99> findAllBySocial(long social) {
        return ten99Repository.findByTen99IdSocial(social);
    }
    
    public Ten99 saveNewTen99(Ten99 ten99) {

        User user = userRepository.findBySocial(ten99.getTen99Id().getSocial());         // Check if the associated user exists
        if (user == null) {                                                        // If user doesn't exist, return null
            return null;
        }

        ten99.setUser(user);
        return ten99Repository.save(ten99);
    }

    public Ten99 updateTen99(Ten99 ten99) {
        List<Ten99> allTen99 = ten99Repository.findAll();
        for (Ten99 currentTen99: allTen99) {
            if (currentTen99.getTen99Id().equals(ten99.getTen99Id())) {                // Check if the Ten99 exists before updating to avoid creating a new Ten99
                ten99.setUser(currentTen99.getUser());                           // If it exists, associate the update with the correct user
                return ten99Repository.save(ten99);                              // then update it
            }
        }

        return null;                                                      // If it doesn't, do nothing

    }

    public void deleteBySocial(long social) {
        ten99Repository.deleteAllByTen99IdSocial(social);
    }

    public void deleteByTen99Id(long social, long payerTin) {
        
        ten99Repository.deleteAllByTen99Id(new Ten99Id(social, payerTin));
    }
}
