package com.skillstorm.taxprepsystem.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.taxprepsystem.models.W2;
import com.skillstorm.taxprepsystem.repositories.W2Repository;

@Service
public class W2Service {

    @Autowired
    private W2Repository w2Repository;

    public List<W2> findAllBySocial(long social) {
        return w2Repository.findByW2IdUser(social);
    }
    
}
