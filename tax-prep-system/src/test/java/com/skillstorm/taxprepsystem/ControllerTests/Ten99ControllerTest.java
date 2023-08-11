package com.skillstorm.taxprepsystem.ControllerTests;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.anyLong;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillstorm.taxprepsystem.controllers.Ten99Controller;
import com.skillstorm.taxprepsystem.models.Ten99;
import com.skillstorm.taxprepsystem.models.Ten99Id;
import com.skillstorm.taxprepsystem.services.Ten99Service;

@WebMvcTest(Ten99Controller.class)
@AutoConfigureMockMvc
@Import(TestSecurityConfig.class)
class Ten99ControllerTest {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private Ten99Service ten99Service;

    @InjectMocks
    private Ten99Controller ten99Controller;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @WithMockUser
    public void testFindAllBySocial() throws Exception {
        List<Ten99> ten99List = new ArrayList<>();
        ten99List.add(new Ten99(new Ten99Id(111223333, 222334444), 10000, 1000));
		ten99List.add(new Ten99(new Ten99Id(444555666, 222334444), 10000, 1000));
		ten99List.add(new Ten99(new Ten99Id(111223333, 333444555), 10000, 1000));
		ten99List.add(new Ten99(new Ten99Id(444555666, 444555666), 10000, 1000));
		ten99List.add(new Ten99(new Ten99Id(665544551, 222334444), 10000, 1000));

        when(ten99Service.findAllBySocial(anyLong())).thenReturn(ten99List);

        mockMvc.perform(MockMvcRequestBuilders.get("/ten99s/{social}", 123456789)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @WithMockUser
    public void testSaveNewTen99() throws Exception {
        Ten99 ten99 = new Ten99(new Ten99Id(111223333, 222334444), 10000, 1000);

        when(ten99Service.saveNewTen99(any(Ten99.class))).thenReturn(ten99);

        mockMvc.perform(MockMvcRequestBuilders.post("/ten99s/ten99")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(ten99)))
                .andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    @WithMockUser
    public void testUpdateTen99() throws Exception {
        Ten99 ten99 = new Ten99(new Ten99Id(111223333, 222334444), 10000, 1000);

        when(ten99Service.updateTen99(any(Ten99.class))).thenReturn(ten99);

        mockMvc.perform(MockMvcRequestBuilders.put("/ten99s/ten99")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(ten99)))
                .andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    @WithMockUser
    public void testDeleteBySocial() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/ten99s/ten99/deleteFor{social}", 123456789))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("1"));
    }

    @Test
    public void testDeleteByTen99Id() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/ten99s/ten99/deleteFor{social}/{payerTin}", 123456789, 987654321))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("1"));
    }
}