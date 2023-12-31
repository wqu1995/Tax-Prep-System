package com.skillstorm.taxprepsystem.database;

import com.mongodb.MongoClientSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.mongo.MongoProperties;
import org.springframework.boot.autoconfigure.mongo.MongoPropertiesClientSettingsBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;

@Configuration
public class DocumentDBConf {

    /**
     * Configuration file for setting up documentdb.
     */
    @Configuration
    @Profile("prod")
    @PropertySource("classpath:application-prod.yml")
    static class DefaultConfig{
        private MongoProperties properties;

        @Autowired
        private ResourceLoader resourceLoader;

        public static final String KEY_STORE_PATH = "classpath:/rds-truststore.jks";
        public static final String DEFAULT_KEY_STORE_PASSWORD = "skillstorm";

        public DefaultConfig(final MongoProperties properties) {
            super();
            this.properties = properties;
        }

        @Bean
        public MongoClientSettings mongoClientSettings() {
            setSslProperties();
            return MongoClientSettings.builder()
                    .applyToSslSettings(builder -> builder.enabled(true))
                    .build();
        }

        private void setSslProperties() {
            try {
                Resource resource = resourceLoader.getResource(KEY_STORE_PATH);
                InputStream inputStream = resource.getInputStream();
                File tempFile = File.createTempFile("temp-truststore", ".jks");
                try (FileOutputStream outputStream = new FileOutputStream(tempFile)) {
                    byte[] buffer = new byte[1024];
                    int bytesRead;
                    while ((bytesRead = inputStream.read(buffer)) != -1) {
                        outputStream.write(buffer, 0, bytesRead);
                    }
                }
                System.setProperty("javax.net.ssl.trustStore", tempFile.getAbsolutePath());
                System.setProperty("javax.net.ssl.trustStorePassword", DEFAULT_KEY_STORE_PASSWORD);
            } catch (Exception e) {
                throw new RuntimeException("Failed to load key store from resources: " + e.getMessage(), e);
            }
        }

        @Bean
        public MongoPropertiesClientSettingsBuilderCustomizer mongoPropertiesCustomizer(final MongoProperties properties) {
            return new MongoPropertiesClientSettingsBuilderCustomizer(properties, null);
        }
    }

    @Configuration
    @Profile("default")
    @PropertySource("classpath:application.yml")
    static class DevConfig{

    }
}
