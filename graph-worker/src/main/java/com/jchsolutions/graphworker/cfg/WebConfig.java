package com.jchsolutions.graphworker.cfg;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.jchsolutions.graphworker.model.Point;
import com.jchsolutions.graphworker.serializer.PointSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class WebConfig {

  @Bean
  public ObjectMapper objectMapper() {
    ObjectMapper mapper = new ObjectMapper();
    SimpleModule module = new SimpleModule();
    module.addSerializer(Point.class, new PointSerializer());
    mapper.registerModule(module);

    return mapper;
  }
}
