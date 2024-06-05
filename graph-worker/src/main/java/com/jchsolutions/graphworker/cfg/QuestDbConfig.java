package com.jchsolutions.graphworker.cfg;

import io.questdb.cairo.CairoConfiguration;
import io.questdb.cairo.DefaultCairoConfiguration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class QuestDbConfig {

  @Value("${quest-db.root}")
  private String questDbRoot;

  @Bean
  CairoConfiguration configuration() {
    return new DefaultCairoConfiguration(questDbRoot);
  }
}
