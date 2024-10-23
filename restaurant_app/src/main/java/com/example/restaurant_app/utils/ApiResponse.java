package com.example.restaurant_app.utils;

import lombok.Data;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Data
public class ApiResponse<T> {

    private int status;
    private String message;
    private T data;
    private String timestamp;
    private String error;

    public ApiResponse() {
        this.timestamp = getCurrentTimestamp();
    }

    public ApiResponse(int status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.timestamp = getCurrentTimestamp();
    }

    private String getCurrentTimestamp() {
        LocalDateTime now = LocalDateTime.now(ZoneId.systemDefault());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return now.format(formatter);
    }
}

