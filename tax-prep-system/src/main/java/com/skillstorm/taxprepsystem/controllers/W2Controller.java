package com.skillstorm.taxprepsystem.controllers;

import java.util.List;


import com.skillstorm.taxprepsystem.security.SecurityConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.skillstorm.taxprepsystem.models.W2;
import com.skillstorm.taxprepsystem.services.W2Service;

@CrossOrigin(origins = SecurityConstants.PROD_ORIGIN, allowCredentials = "true")
@RestController
@RequestMapping("/w2s")
public class W2Controller {

    @Autowired
    private W2Service w2Service;

    /**
     * Handler for GET ("/{social}")
     *
     * @param social the social
     * @return the response entity
     */
    @GetMapping("/{social}")
    public ResponseEntity<List<W2>> findAllBySocial(@PathVariable long social) {
        List<W2> allW2 = w2Service.findAllBySocial(social);

        return new ResponseEntity<List<W2>>(allW2, HttpStatus.OK);
    }

    /**
     * Handler for POST ("/w2")
     *
     * @param w2 the w 2
     * @return the response entity
     */
    @PostMapping("/w2")
    public ResponseEntity<W2> saveNewW2(@RequestBody W2 w2) {
        W2 newW2 = w2Service.saveNewW2(w2);

        return new ResponseEntity<W2>(newW2, HttpStatus.CREATED);
    }

    /**
     * Handler for PUT ("/w2")
     *
     * @param w2 the w 2
     * @return the response entity
     */
    @PutMapping("/w2")
    public ResponseEntity<W2> updateW2(@RequestBody W2 w2) {
        W2 newW2 = w2Service.updateW2(w2);

        return new ResponseEntity<W2>(newW2, HttpStatus.CREATED);
    }

    /**
     * Handler for DELETE ("/w2/deleteFor{social}")
     *
     * @param social the social
     * @return the int
     */
    @DeleteMapping("/w2/deleteFor{social}")
    public int deleteBySocial(@PathVariable long social) {
        w2Service.deleteBySocial(social);

        return 1;
    }

    /**
     * Handler for DELETE ("/w2/deleteFor{social}/{empTin}")
     *
     * @param social the social
     * @param empTin the emp tin
     * @return the int
     */
    @DeleteMapping("/w2/deleteFor{social}/{empTin}")
    public int deleteByW2Id(@PathVariable long social, @PathVariable long empTin) {
        w2Service.deleteByW2Id(social, empTin);

        return 1;
    }

    


    
}
