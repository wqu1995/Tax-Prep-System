package com.skillstorm.taxprepsystem.ServiceTests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.skillstorm.taxprepsystem.models.Ten99;
import com.skillstorm.taxprepsystem.models.Ten99Id;
import com.skillstorm.taxprepsystem.models.User;
import com.skillstorm.taxprepsystem.repositories.Ten99Repository;
import com.skillstorm.taxprepsystem.repositories.UserRepository;
import com.skillstorm.taxprepsystem.services.Ten99Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class Ten99ServiceTest {

    @InjectMocks
    private Ten99Service ten99Service;

    @Mock
    private Ten99Repository ten99Repository;

    @Mock
    private UserRepository userRepository;

    @Test
    public void testFindAllBySocial() {
        long social = 111223333;
        List<Ten99> expectedTen99List = new ArrayList<>();
        expectedTen99List.add(new Ten99(new Ten99Id(111223333, 222334444), 10000, 1000));
		expectedTen99List.add(new Ten99(new Ten99Id(111223333, 222334444), 10000, 1000));
		expectedTen99List.add(new Ten99(new Ten99Id(111223333, 333444555), 10000, 1000));
		expectedTen99List.add(new Ten99(new Ten99Id(111223333, 444555666), 10000, 1000));
		expectedTen99List.add(new Ten99(new Ten99Id(111223333, 222334444), 10000, 1000));
        when(ten99Repository.findByTen99IdSocial(social)).thenReturn(expectedTen99List);

        List<Ten99> actualTen99List = ten99Service.findAllBySocial(social);

        assertEquals(expectedTen99List, actualTen99List);
    }

    @Test
    public void testSaveNewTen99_UserExists() {
        Ten99 ten99 = new Ten99(new Ten99Id(111223333, 222334444), 10000, 1000);
        long social = ten99.getTen99Id().getSocial();
        User mockUser = new User(123123123, "John", "Man", 1231231231, "24 lane", "Austin", "Texas", 49922, "S");
        when(userRepository.findBySocial(social)).thenReturn(Optional.of(mockUser));
        when(ten99Repository.save(ten99)).thenReturn(ten99);

        Ten99 savedTen99 = ten99Service.saveNewTen99(ten99);

        assertNotNull(savedTen99);
        verify(ten99Repository, times(1)).save(ten99);
    }

    @Test
    public void testSaveNewTen99_UserDoesNotExist() {
        Ten99 ten99 = new Ten99(new Ten99Id(111223333, 222334444), 10000, 1000);
        long social = ten99.getTen99Id().getSocial();
        when(userRepository.findBySocial(social)).thenReturn(Optional.empty());

        Ten99 savedTen99 = ten99Service.saveNewTen99(ten99);

        assertNull(savedTen99);
        verify(ten99Repository, never()).save(any());
    }

    @Test
    public void testUpdateTen99_Ten99Exists() {
        Ten99 ten99 = new Ten99(new Ten99Id(111223333, 222334444), 10000, 1000);
        Ten99Id ten99Id = ten99.getTen99Id();
        List<Ten99> allTen99 = new ArrayList<>();
        allTen99.add(ten99);
        when(ten99Repository.findAll()).thenReturn(allTen99);
        when(ten99Repository.save(ten99)).thenReturn(ten99);

        Ten99 updatedTen99 = ten99Service.updateTen99(ten99);

        assertNotNull(updatedTen99);
        verify(ten99Repository, times(1)).save(ten99);
    }

    @Test
    public void testUpdateTen99_Ten99DoesNotExist() {
        Ten99 ten99 = new Ten99(new Ten99Id(111223333, 222334444), 10000, 1000);
        List<Ten99> allTen99 = new ArrayList<>();
        when(ten99Repository.findAll()).thenReturn(allTen99);

        Ten99 updatedTen99 = ten99Service.updateTen99(ten99);

        assertNull(updatedTen99);
        verify(ten99Repository, never()).save(any());
    }

    @Test
    public void testDeleteBySocial() {
        long social = 111223333;

        ten99Service.deleteBySocial(social);

        verify(ten99Repository, times(1)).deleteBySocial(social);
    }

    @Test
    public void testDeleteByTen99Id() {
        long social = 111223333;
        long payerTin = 111223339;

        ten99Service.deleteByTen99Id(social, payerTin);

        verify(ten99Repository, times(1)).deleteAllByTen99Id(new Ten99Id(social, payerTin));
    }
}
