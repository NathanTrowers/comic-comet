package com.comiccomet.fourthwall.util;

import static org.junit.jupiter.api.Assertions.assertNotEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TokenManagerTest {
    @Autowired
    TokenManager tokenManager;

    @Test
    void testInvalidateToken() {
        /** Data */
        String originalToken = tokenManager.generateToken("6963a34d-7c0a-42ed-961f-83b31e7c8f36", "admin");

        /** Call to Test*/
        String result = tokenManager.invalidateToken(originalToken);

        /** Assertions*/
        assertNotEquals(originalToken, result);
    }
}
