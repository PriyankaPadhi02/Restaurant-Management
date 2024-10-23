package com.example.restaurant_app.controller;

import com.example.restaurant_app.dto.AuthenticationRequest;
import com.example.restaurant_app.dto.AuthenticationResponse;
import com.example.restaurant_app.dto.SignupDto;
import com.example.restaurant_app.dto.UserDto;
import com.example.restaurant_app.service.AuthService;
import com.example.restaurant_app.service.impl.UserDetailsServiceImpl;
import com.example.restaurant_app.utils.ApiResponseUtil;
import com.example.restaurant_app.utils.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/auth")
@Slf4j
public class AuthController {

    private final AuthService authService;

    private final AuthenticationManager authenticationManager;

    private final UserDetailsServiceImpl userDetailsService;

    private final JwtUtil jwtUtil;

    public AuthController(AuthService authService, AuthenticationManager authenticationManager, UserDetailsServiceImpl userDetailsService, JwtUtil jwtUtil) {
        this.authService = authService;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@RequestBody SignupDto signupDto) {

        UserDto createdUser = authService.createUser(signupDto);

        if (createdUser == null) {
            return ApiResponseUtil.buildResponse(HttpStatus.BAD_REQUEST, "User already exists!!", null, "User creation failed!!");
        }

        return ApiResponseUtil.buildResponse(HttpStatus.CREATED, "User created successfully.", createdUser, null);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authRequest, HttpServletResponse response) throws IOException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Incorrect Username or Password");
        } catch (DisabledException disabledException) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "User not active");
            return null;
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getEmail());
        final String role = userDetailsService.getUserRoleByUsername(authRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails.getUsername(), role);
        return ApiResponseUtil.buildResponse(HttpStatus.OK, "Login successfully.", new AuthenticationResponse(jwt), null);
    }
}