package com.example.restaurant_app.service.impl;

import com.example.restaurant_app.dto.SignupDto;
import com.example.restaurant_app.dto.UserDto;
import com.example.restaurant_app.enums.UserRole;
import com.example.restaurant_app.model.User;
import com.example.restaurant_app.repository.UserRepository;
import com.example.restaurant_app.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    public AuthServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDto createUser(SignupDto signupDto) {

        if (userRepository.existsByEmail(signupDto.getEmail())) {
            log.info("Email already exists: {}", signupDto.getEmail());
            return null;
        }

        User user = new User();
        user.setName(signupDto.getName());
        user.setEmail(signupDto.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(signupDto.getPassword()));
        user.setUserRole(UserRole.CUSTOMER);
        User createdUser = userRepository.save(user);

        UserDto userDto = new UserDto();
        userDto.setId(createdUser.getId());
        userDto.setName(createdUser.getName());
        userDto.setEmail(createdUser.getEmail());
        userDto.setPassword(createdUser.getPassword());
        userDto.setUserRole(createdUser.getUserRole());

        log.info("User created with ID: {}", createdUser.getId());

        return userDto;
    }
}
