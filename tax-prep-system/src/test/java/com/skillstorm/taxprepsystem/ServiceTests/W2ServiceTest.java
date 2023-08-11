package com.skillstorm.taxprepsystem.ServiceTests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.skillstorm.taxprepsystem.models.User;
import com.skillstorm.taxprepsystem.models.W2;
import com.skillstorm.taxprepsystem.models.W2Id;
import com.skillstorm.taxprepsystem.repositories.UserRepository;
import com.skillstorm.taxprepsystem.repositories.W2Repository;
import com.skillstorm.taxprepsystem.services.W2Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class W2ServiceTest {

    @InjectMocks
    private W2Service w2Service;

    @Mock
    private W2Repository w2Repository;

    @Mock
    private UserRepository userRepository;

    @Test
    public void testFindAllBySocial() {
        long social = 111223333;
        List<W2> expectedW2List = new ArrayList<>();
        expectedW2List.add(new W2(new W2Id(111223333, 222334444), 10000, 1000));
		expectedW2List.add(new W2(new W2Id(111223333, 111223333), 10000, 1000));
		expectedW2List.add(new W2(new W2Id(111223333, 333444555), 10000, 1000));
		expectedW2List.add(new W2(new W2Id(111223333, 444555666), 10000, 1000));
		expectedW2List.add(new W2(new W2Id(111223333, 222374444), 10000, 1000));
        when(w2Repository.findAllBySocial(social)).thenReturn(expectedW2List);

        List<W2> actualW2List = w2Service.findAllBySocial(social);

        assertEquals(expectedW2List, actualW2List);
    }

    @Test
    public void testSaveNewW2_UserExists() {
        W2 w2 = new W2(new W2Id(123123123, 222334444), 10000, 1000);
        long social = w2.getW2Id().getSocial();
        User mockUser = new User(123123123, "John", "Man", 1231231231, "24 lane", "Austin", "Texas", 49922, "S");
        when(userRepository.findBySocial(social)).thenReturn(Optional.of(mockUser));
        when(w2Repository.save(w2)).thenReturn(w2);

        W2 savedW2 = w2Service.saveNewW2(w2);

        assertNotNull(savedW2);
        verify(w2Repository, times(1)).save(w2);
    }

    @Test
    public void testSaveNewW2_UserDoesNotExist() {
        W2 w2 = new W2(new W2Id(123123123, 222334444), 10000, 1000);
        long social = w2.getW2Id().getSocial();
        when(userRepository.findBySocial(social)).thenReturn(Optional.empty());

        W2 savedW2 = w2Service.saveNewW2(w2);

        assertNull(savedW2);
        verify(w2Repository, never()).save(any());
    }

    @Test
    public void testUpdateW2_W2Exists() {
        W2 w2 = new W2(new W2Id(123123123, 222334444), 10000, 1000);
        W2Id w2Id = w2.getW2Id();
        List<W2> allW2 = new ArrayList<>();
        allW2.add(w2);
        when(w2Repository.findAll()).thenReturn(allW2);
        when(w2Repository.save(w2)).thenReturn(w2);

        W2 updatedW2 = w2Service.updateW2(w2);

        assertNotNull(updatedW2);
        verify(w2Repository, times(1)).save(w2);
    }

    @Test
    public void testUpdateW2_W2DoesNotExist() {
        W2 w2 = new W2(new W2Id(123123123, 222334444), 10000, 1000);
        List<W2> allW2 = new ArrayList<>();
        when(w2Repository.findAll()).thenReturn(allW2);

        W2 updatedW2 = w2Service.updateW2(w2);

        assertNull(updatedW2);
        verify(w2Repository, never()).save(any());
    }

    @Test
    public void testDeleteBySocial() {
        long social = 123123123;

        w2Service.deleteBySocial(social);

        verify(w2Repository, times(1)).deleteBySocial(social);
    }

    @Test
    public void testDeleteByW2Id() {
        long social = 123123123;
        long empTin = 123123129;

        w2Service.deleteByW2Id(social, empTin);

        verify(w2Repository, times(1)).deleteAllByW2Id(new W2Id(social, empTin));
    }
}
