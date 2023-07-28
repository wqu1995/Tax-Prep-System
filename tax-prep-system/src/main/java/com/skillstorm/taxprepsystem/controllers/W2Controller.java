package com.skillstorm.taxprepsystem.controllers;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.taxprepsystem.models.W2;
import com.skillstorm.taxprepsystem.services.W2Service;

@RestController
@RequestMapping("/w2s")
public class W2Controller {

    @Autowired
    private W2Service w2Service;

    @GetMapping("/{social}")
    public ResponseEntity<List<W2>> findAllBySocial(@PathVariable long social) {
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

    @DeleteMapping("/w2/deleteFor{social}")
    public int deleteBySocial(@PathVariable long social) {
        w2Service.deleteBySocial(social);

        return 1;
    }

    @DeleteMapping("/w2/deleteFor{social}/{empTin}")
    public int deleteByW2Id(@PathVariable long social, @PathVariable long empTin) {
        w2Service.deleteByW2Id(social, empTin);

        return 1;
    }

    


    
}
