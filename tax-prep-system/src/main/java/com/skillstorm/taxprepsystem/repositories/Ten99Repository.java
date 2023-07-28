package com.skillstorm.taxprepsystem.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.skillstorm.taxprepsystem.models.Ten99;
import com.skillstorm.taxprepsystem.models.Ten99Id;

@Repository
public interface Ten99Repository extends MongoRepository<Ten99, Ten99Id> {

    @Query("{'ten99Id.social' : ?0}")
    List<Ten99> findByTen99IdSocial(long social);

    @Query(value = "{'ten99Id.social' : ?0}", delete = true)
    List<Ten99> deleteBySocial(long social);

    void deleteAllByTen99Id(Ten99Id ten99Id);
}
