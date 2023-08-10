package com.skillstorm.taxprepsystem.RepositoryTests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.skillstorm.taxprepsystem.models.Ten99;
import com.skillstorm.taxprepsystem.models.Ten99Id;
import com.skillstorm.taxprepsystem.repositories.Ten99Repository;

@DataMongoTest
@ExtendWith(SpringExtension.class)
public class Ten99RepositoryTest {

    @Autowired
    private Ten99Repository ten99Repository;

    @Test
    public void testFindByTen99IdSocial() {
        // Create a sample Ten99 object and save it to the repository
        Ten99Id sampleId = new Ten99Id(987654321, 123456789);
        Ten99 sampleTen99 = new Ten99(sampleId, 10000, 1000);
        ten99Repository.save(sampleTen99);

        // Call the repository method
        List<Ten99> foundTen99List = ten99Repository.findByTen99IdSocial(123456789L);

        // Assert that the result contains the sample Ten99 object
        assertEquals(1, foundTen99List.size());
        assertEquals(sampleId, foundTen99List.get(0).getTen99Id());
    }

    @Test
    public void testDeleteBySocial() {
        // Create a sample Ten99 object and save it to the repository
        Ten99Id sampleId = new Ten99Id("sampleId", 987654321L);
        Ten99 sampleTen99 = new Ten99(sampleId, /* other fields */);
        ten99Repository.save(sampleTen99);

        // Call the repository delete method
        ten99Repository.deleteBySocial(987654321L);

        // Assert that the object has been deleted
        assertTrue(ten99Repository.findByTen99IdSocial(987654321L).isEmpty());
    }

    @Test
    public void testDeleteAllByTen99Id() {
        // Create a sample Ten99 object and save it to the repository
        Ten99Id sampleId = new Ten99Id("sampleId", 111111111L);
        Ten99 sampleTen99 = new Ten99(sampleId, /* other fields */);
        ten99Repository.save(sampleTen99);

        // Call the repository delete method
        ten99Repository.deleteAllByTen99Id(sampleId);

        // Assert that the object has been deleted
        assertTrue(ten99Repository.findById(sampleId).isEmpty());
    }
}