package com.example.restaurant_app.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
@Slf4j
public class JwtUtil {
    private static final int TOKEN_VALIDITY = 3600 * 5;

    @Value("${jwt_secret_key}")
    private String secret_key;


//    public String getUserNameFromToken(String token) {
//        log.info("get claim from token");
//        return getClaimFromToken(token, Claims::getSubject);
//    }

//    private <T> T getClaimFromToken(String token, Function<Claims, T> claimResolver) {
//        log.info("get all claim from token");
//        final Claims claims = getAllClaimsFromToken(token);
//        return claimResolver.apply(claims);
//    }

//    private Claims getAllClaimsFromToken(String token) {
//        log.info("get claims");
//        return Jwts.parser().setSigningKey(secret_key).parseClaimsJws(token).getBody();
//    }

//    public boolean validateToken(String token, UserDetails userDetails) {
//        log.info("validateToken", token, userDetails);
//        String userName = getUserNameFromToken(token);
//        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
//    }

//    private boolean isTokenExpired(String token) {
//        final Date expDate = getExpirationDateFromToken(token);
//        return expDate.before(new Date());
//    }

    //    private Date getExpirationDateFromToken(String token) {
//        return getClaimFromToken(token, Claims::getExpiration);
//    }
//
    public String generateToken(String email, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);
        return createToken(claims, email);
    }

    private String createToken(Map<String, Object> claims, String email) {
        return Jwts.builder().setClaims(claims).setSubject(email).setIssuedAt(new Date(System.currentTimeMillis())).setExpiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY * 1000)).signWith(getSignKey(), SignatureAlgorithm.HS256).compact();

    }

    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret_key);
        return Keys.hmacShaKeyFor(keyBytes);
    }


}
