package com.skillstorm.taxprepsystem.RepositoryTests;

import static org.junit.jupiter.api.Assertions.*;
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

import com.skillstorm.taxprepsystem.models.W2;
import com.skillstorm.taxprepsystem.models.W2Id;
import com.skillstorm.taxprepsystem.repositories.W2Repository;

@DataMongoTest
@ExtendWith(SpringExtension.class)
public class W2RepositoryTest {

    @Autowired
    private W2Repository w2Repository;

    @Test
    public void testFindByW2IdSocial() {
        W2Id sampleId = new W2Id(987654321, 123456789);
        W2 sampleW2 = new W2(sampleId, 10000, 1000);
        w2Repository.save(sampleW2);

        List<W2> foundW2List = w2Repository.findAllBySocial(987654321);

        assertEquals(1, foundW2List.size());
        assertEquals(sampleId, foundW2List.get(0).getW2Id());
    }

    @Test
    public void testDeleteBySocial() {
        W2Id sampleId = new W2Id(987654321, 123456789);
        W2 sampleW2 = new W2(sampleId, 10000, 1000);
        w2Repository.save(sampleW2);

        w2Repository.deleteBySocial(987654321);

        assertTrue(w2Repository.findAllBySocial(987654321).isEmpty());
    }

    @Test
    public void testDeleteAllByW2Id() {
        W2Id sampleId = new W2Id(987654321, 123456789);
        W2 sampleW2 = new W2(sampleId, 10000, 1000);
        w2Repository.save(sampleW2);

        w2Repository.deleteAllByW2Id(sampleId);

        assertFalse(w2Repository.findById(sampleId).isPresent());
    }
}
