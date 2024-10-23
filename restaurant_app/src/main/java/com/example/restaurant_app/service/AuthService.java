package com.example.restaurant_app.service;

import com.example.restaurant_app.dto.SignupDto;
import com.example.restaurant_app.dto.UserDto;

public interface AuthService {
    UserDto createUser(SignupDto signupDto);
}
