package com.skillstorm.taxprepsystem.controllers;

import java.util.List;

import com.skillstorm.taxprepsystem.security.SecurityConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.taxprepsystem.models.Ten99;
import com.skillstorm.taxprepsystem.services.Ten99Service;

@CrossOrigin(origins = SecurityConstants.PROD_ORIGIN, allowCredentials = "true")
@RestController
@RequestMapping("/ten99s")
public class Ten99Controller {

    @Autowired
    private Ten99Service ten99Service;

    /**
     * Handler for GET request ("/{social}")
     *
     * @param social the social
     * @return the response entity
     */
    @GetMapping("/{social}")
    public ResponseEntity<List<Ten99>> findAllBySocial(@PathVariable long social) {
        List<Ten99> allTen99 = ten99Service.findAllBySocial(social);

        return new ResponseEntity<List<Ten99>>(allTen99, HttpStatus.OK);
    }

    /**
     * Handler for POST request ("/ten99")
     *
     * @param ten99 the ten 99
     * @return the response entity
     */
    @PostMapping("/ten99")
    public ResponseEntity<Ten99> saveNewTen99(@RequestBody Ten99 ten99) {
        Ten99 newTen99 = ten99Service.saveNewTen99(ten99);

        return new ResponseEntity<Ten99>(newTen99, HttpStatus.CREATED);
    }

    /**
     * Handler for PUT request ("/ten99")
     *
     * @param ten99 the ten 99
     * @return the response entity
     */
    @PutMapping("/ten99")
    public ResponseEntity<Ten99> updateTen99(@RequestBody Ten99 ten99) {
        Ten99 newTen99 = ten99Service.updateTen99(ten99);

        return new ResponseEntity<Ten99>(newTen99, HttpStatus.CREATED);
    }

    /**
     * Handler for Delete request ("/ten99/deleteFor{social}")
     *
     * @param social the social
     * @return the int
     */
    @DeleteMapping("/ten99/deleteFor{social}")
    public int deleteBySocial(@PathVariable long social) {
        ten99Service.deleteBySocial(social);

        return 1;
    }

    /**
     * Handler for Delete request ("/ten99/deleteFor{social}/{payerTin}")
     *
     * @param social   the social
     * @param payerTin the payer tin
     * @return the int
     */
    @DeleteMapping("/ten99/deleteFor{social}/{payerTin}")
    public int deleteByTen99Id(@PathVariable long social, @PathVariable long payerTin) {
        ten99Service.deleteByTen99Id(social, payerTin);

        return 1;
    }
    
}
