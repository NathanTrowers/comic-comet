package com.comiccomet.meteorshower.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@Component
public class WebMvcConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String theObservatoryUrl = System.getenv("THE_OBSERVATORY_URL");
        registry.addMapping("/**")
            .allowedOrigins(theObservatoryUrl)
            .allowedMethods("GET","POST","PUT");
    }
}
