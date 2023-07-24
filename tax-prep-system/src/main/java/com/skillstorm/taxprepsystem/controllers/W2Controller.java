package com.skillstorm.taxprepsystem.controllers;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.taxprepsystem.models.W2;
import com.skillstorm.taxprepsystem.services.W2Service;

@RestController
@RequestMapping("/w2s")
public class W2Controller {

    @Autowired
    private W2Service w2Service;

    @GetMapping
    public ResponseEntity<List<W2>> findAllBySocial(@RequestParam(value="social") long social) {
        List<W2> allW2 = w2Service.findAllBySocial(social);

        return new ResponseEntity<List<W2>>(allW2, HttpStatus.OK);
    }

    @PostMapping("/w2")
    public ResponseEntity<W2> saveNewW2(@RequestBody W2 w2) {
        W2 newW2 = w2Service.saveNewW2(w2);

        return new ResponseEntity<W2>(newW2, HttpStatus.CREATED);
    }

    @PutMapping("/w2")
    public ResponseEntity<W2> updateW2(@RequestBody W2 w2) {
        W2 newW2 = w2Service.updateW2(w2);

        return new ResponseEntity<W2>(newW2, HttpStatus.CREATED);
    }

    @DeleteMapping("/w2")
    @Transactional
    public int deleteBySocial(@RequestParam(value="social") long social) {
        w2Service.deleteBySocial(social);

        return 1;
    }

    @DeleteMapping("/w2")
    @Transactional
    public int deleteByEmpTin(@RequestParam(value="empTin") long empTin) {          // ***UPDATE THIS TO BE DLETE BY W2ID NOT EMPTIN - EMPTIN DELETES ALL WITH SAME EMPTIN
        w2Service.deleteByEmpTin(empTin);

        return 1;
    }

    


    
}
