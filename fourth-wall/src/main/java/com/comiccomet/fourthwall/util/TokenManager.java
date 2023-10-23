package com.comiccomet.fourthwall.util;

import java.security.Key;
import java.util.Date;
import java.util.UUID;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class TokenManager {
    private static String SECRET_KEY = System.getenv("SECRET_KEY");

	public TokenManager() {}

	public String generateToken(String role) {
		long millisecondsNow = System.currentTimeMillis();
		Date dateNow = new Date(millisecondsNow);
		Date expirationDate = new Date(millisecondsNow + 86400000);

		SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
		byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(SECRET_KEY);
		Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());
		
		JwtBuilder builder = Jwts.builder()
				.setId(String.valueOf(UUID.randomUUID()))
				.setIssuedAt(dateNow)
				.setIssuer("fourth-wall")
				.setExpiration(expirationDate)
				.claim("role", role)
				.signWith(signatureAlgorithm, signingKey);

		return builder.compact();
	}

	public String invalidateToken(String token) {
		double randomNumber = Math.floor((Math.random() * 10000));
		String randomNumberString = Double.toString(randomNumber);
		String hashedRandomNumber = BCrypt.hashpw(randomNumberString, BCrypt.gensalt());

		return token + hashedRandomNumber;
	}
}
