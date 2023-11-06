package com.comiccomet.sagecave.util;

import java.util.Date;

import javax.xml.bind.DatatypeConverter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.comiccomet.sagecave.service.AdminService;

import io.jsonwebtoken.IncorrectClaimException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MissingClaimException;

@Component
public class TokenManager {
    private static final Logger log = LoggerFactory.getLogger(AdminService.class);
    private static String SECRET_KEY = System.getenv("SECRET_KEY");

    public TokenManager() {}
    // expirationDate > currentDate

// 

    public boolean validateToken(String token) {
        try{
            
            Date expiresAt = Jwts.parserBuilder()
                .requireIssuer("fourth-wall")
                .require("role", "admin")
                .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY))
                .build()
                .parseClaimsJws(token.substring(7))
                .getBody()
                .getExpiration();

            if (expiresAt.before(new Date())) {
                return  false;
            }

            log.info("Token validation successful!");

            return true;
        } catch(MissingClaimException missingClaimException) {
            log.error("A claim is missing from this token: \n", missingClaimException);

            return false;
        } catch(IncorrectClaimException incorrectClaimException) {
            log.error("An incorect claim is present in this token: \n", incorrectClaimException);

            return false;
        } catch(Exception error) {
            log.error("An error ocurred while validating the token: \n", error);

            return false;
        }
    }
}
