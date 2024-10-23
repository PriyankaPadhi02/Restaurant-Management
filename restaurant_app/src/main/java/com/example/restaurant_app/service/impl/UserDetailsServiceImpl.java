package com.example.restaurant_app.service.impl;

import com.example.restaurant_app.model.User;
import com.example.restaurant_app.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;


@Service
@Slf4j
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Optional<User> optionalUser = userRepository.findFirstByEmail(email);
        if (optionalUser.isEmpty()) throw new UsernameNotFoundException("User not found", null);
        return new org.springframework.security.core.userdetails.User(optionalUser.get().getEmail(), optionalUser.get().getPassword(), new ArrayList<>());
    }

    public String getUserRoleByUsername(String email) {
        Optional<User> optionalUser = userRepository.findFirstByEmail(email);
        if (optionalUser.isEmpty()) throw new UsernameNotFoundException("User not found");
        return optionalUser.get().getUserRole().name();
    }
}
