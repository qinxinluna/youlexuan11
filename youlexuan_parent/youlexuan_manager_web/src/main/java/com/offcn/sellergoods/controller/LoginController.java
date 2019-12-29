package com.offcn.sellergoods.controller;


import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/login")
public class LoginController {

    @RequestMapping("getName")
    public String getName(){
        String name=SecurityContextHolder.getContext().getAuthentication().getName();

        return name ;
    }
}