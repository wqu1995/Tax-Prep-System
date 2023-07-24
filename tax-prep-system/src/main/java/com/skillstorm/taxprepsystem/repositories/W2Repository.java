package com.skillstorm.taxprepsystem.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.taxprepsystem.models.W2;
import com.skillstorm.taxprepsystem.models.W2Id;

@Repository
public interface W2Repository extends JpaRepository<W2, W2Id>{

    List<W2> findByW2IdUser(long social);
    
}
