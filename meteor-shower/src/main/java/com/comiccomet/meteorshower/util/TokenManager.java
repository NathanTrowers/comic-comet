package com.comiccomet.meteorshower.util;

import java.util.Date;

import javax.xml.bind.DatatypeConverter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.comiccomet.meteorshower.service.CustomerService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.IncorrectClaimException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MissingClaimException;

@Component
public class TokenManager {
    private static final Logger log = LoggerFactory.getLogger(CustomerService.class);
    private static String SECRET_KEY = System.getenv("SECRET_KEY");

    public TokenManager() {}

    public String validateToken(String token) {
        String validationFailure = "";

        try{
            Claims claims = Jwts.parserBuilder()
                .requireIssuer("fourth-wall")
                .require("role", "customer")
                .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY))
                .build()
                .parseClaimsJws(token.substring(7))
                .getBody();

            String adminId = claims.getId();
            Date expiresAt = claims.getExpiration();
            if (expiresAt.before(new Date()) || adminId == null) {
                return validationFailure;
            }

            log.info("Token validation successful for id {}!", adminId);

            return adminId;
        } catch(MissingClaimException missingClaimException) {
            log.error("A claim is missing from this token: \n", missingClaimException);

            return validationFailure;
        } catch(IncorrectClaimException incorrectClaimException) {
            log.error("An incorect claim is present in this token: \n", incorrectClaimException);

            return validationFailure;
        } catch(Exception error) {
            log.error("An error ocurred while validating the token: \n", error);

            return validationFailure;
        }
    }
}
