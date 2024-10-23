package com.example.restaurant_app.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ApiResponseUtil {
    public static <T> ResponseEntity<ApiResponse<T>> buildResponse(HttpStatus status, String message, T data, String error) {

        ApiResponse<T> response = new ApiResponse<>(status.value(), message, data);
        response.setError(error);
        return ResponseEntity.status(status).body(response);
    }
}
