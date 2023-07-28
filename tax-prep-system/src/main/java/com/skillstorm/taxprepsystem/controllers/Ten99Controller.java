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

import com.skillstorm.taxprepsystem.models.Ten99;
import com.skillstorm.taxprepsystem.services.Ten99Service;


@RestController
@RequestMapping("/ten99s")
public class Ten99Controller {

    @Autowired
    private Ten99Service ten99Service;

    @GetMapping("/{social}")
    public ResponseEntity<List<Ten99>> findAllBySocial(@PathVariable long social) {
        List<Ten99> allTen99 = ten99Service.findAllBySocial(social);

        return new ResponseEntity<List<Ten99>>(allTen99, HttpStatus.OK);
    }

    @PostMapping("/ten99")
    public ResponseEntity<Ten99> saveNewTen99(@RequestBody Ten99 ten99) {
        Ten99 newTen99 = ten99Service.saveNewTen99(ten99);

        return new ResponseEntity<Ten99>(newTen99, HttpStatus.CREATED);
    }

    @PutMapping("/ten99")
    public ResponseEntity<Ten99> updateTen99(@RequestBody Ten99 ten99) {
        Ten99 newTen99 = ten99Service.updateTen99(ten99);

        return new ResponseEntity<Ten99>(newTen99, HttpStatus.CREATED);
    }

    @DeleteMapping("/ten99/deleteFor{social}")
    public int deleteBySocial(@PathVariable long social) {
        ten99Service.deleteBySocial(social);

        return 1;
    }

    @DeleteMapping("/ten99/deleteFor{social}/{payerTin}")
    public int deleteByTen99Id(@PathVariable long social, @PathVariable long payerTin) {
        ten99Service.deleteByTen99Id(social, payerTin);

        return 1;
    }
    
}
