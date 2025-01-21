package com.personalProj.Config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = "com.personalProj.Repository")
@EntityScan("com.personalProj.Entity")
public class JpaConfig {

}