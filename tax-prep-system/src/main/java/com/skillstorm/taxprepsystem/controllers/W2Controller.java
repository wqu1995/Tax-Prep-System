package com.skillstorm.taxprepsystem.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.taxprepsystem.models.W2;
import com.skillstorm.taxprepsystem.services.W2Service;

@RestController
@RequestMapping("/W2")
public class W2Controller {

    @Autowired
    W2Service w2Service;

    @GetMapping
    public ResponseEntity<List<W2>> findAllBySocial(@RequestParam(value="social") long social) {
        List<W2> allW2 = w2Service.findAllBySocial(social);

        return new ResponseEntity<List<W2>>(allW2, HttpStatus.OK);
    }


    
}
