package com.comiccomet.sagecave.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@Component
public class WebMvcConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String sageMountainUrl = System.getenv("SAGE_MOUNTAIN_URL");
        registry.addMapping("/**")
            .allowedOrigins(sageMountainUrl)
            .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}
