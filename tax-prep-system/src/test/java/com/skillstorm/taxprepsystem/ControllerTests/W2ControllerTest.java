package com.skillstorm.taxprepsystem.ControllerTests;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.Cookie;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.test.context.support.WithMockUser;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;





import com.skillstorm.taxprepsystem.controllers.W2Controller;
import com.skillstorm.taxprepsystem.models.W2;
import com.skillstorm.taxprepsystem.models.W2Id;
import com.skillstorm.taxprepsystem.security.JWTGenerator;
import com.skillstorm.taxprepsystem.services.W2Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(W2Controller.class)
@AutoConfigureMockMvc
@Import(TestSecurityConfig.class)
class W2ControllerTest {

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
    private MockMvc mockMvc;

    @MockBean
    private W2Service w2Service;

	@MockBean
	private JWTGenerator jwtGenerator;

    @InjectMocks
    private W2Controller w2Controller;


    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

	@Test
	@WithMockUser
    public void testFindAllBySocial() throws Exception {
        List<W2> w2List = new ArrayList<>();
        w2List.add(new W2(new W2Id(111223333, 222334444), 10000, 1000));
		w2List.add(new W2(new W2Id(444555666, 222334444), 10000, 1000));
		w2List.add(new W2(new W2Id(111223333, 333444555), 10000, 1000));
		w2List.add(new W2(new W2Id(444555666, 444555666), 10000, 1000));
		w2List.add(new W2(new W2Id(665544551, 222334444), 10000, 1000));

        when(w2Service.findAllBySocial(anyLong())).thenReturn(w2List);

        mockMvc.perform(MockMvcRequestBuilders.get("/w2s/{social}", 111223333)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.status().isOk());
            
    }

	@Test
	@WithMockUser
	public void testSaveNewW2() throws Exception {
		W2 w2 = new W2(new W2Id(111223333, 222334444), 10000, 1000);

		when(w2Service.saveNewW2(any(W2.class))).thenReturn(w2);

		mockMvc.perform(MockMvcRequestBuilders.post("/w2s/w2")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(w2)))
				.andExpect(MockMvcResultMatchers.status().isCreated());
	}

	@Test
	@WithMockUser
	public void testUpdateW2() throws Exception {
		W2 w2 = new W2(new W2Id(111223333, 222334444), 10000, 1000);

		when(w2Service.updateW2(any(W2.class))).thenReturn(w2);

		mockMvc.perform(MockMvcRequestBuilders.put("/w2s/w2")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(w2)))
				.andExpect(MockMvcResultMatchers.status().isCreated());
	}

	@Test
	@WithMockUser
	public void testDeleteBySocial() throws Exception {

		mockMvc.perform(MockMvcRequestBuilders.delete("/w2s/w2/deleteFor{social}", 123456789))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(content().string("1"));
	}

	@Test
	public void testDeleteByW2Id() throws Exception {

		mockMvc.perform(MockMvcRequestBuilders.delete("/w2s/w2/deleteFor{social}/{empTin}", 123456789, 987654321))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(content().string("1"));
	}

		

}
