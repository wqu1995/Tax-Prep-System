package com.skillstorm.taxprepsystem.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.skillstorm.taxprepsystem.models.W2;
import com.skillstorm.taxprepsystem.models.W2Id;

@Repository
public interface W2Repository extends MongoRepository<W2, W2Id>{

    @Query("{'w2Id.social' : ?0}")
    List<W2> findAllBySocial(long social);

    void deleteAllByW2IdSocial(long social);

    void deleteAllByW2Id(W2Id w2Id);
    
}
