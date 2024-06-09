package com.jchsolutions.graphworker.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.ZonedDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@TestPropertySource("/application-test.yaml")
public class GraphServiceTest {

  @Autowired
  GraphService graphService;

  @Test
  public void testSql() {
    var startTimestamp = ZonedDateTime.parse("2019-01-01T00:00:00Z");
    var endTimestamp = ZonedDateTime.parse("2020-07-31T23:59:59Z");

    var plot = graphService.plot(startTimestamp, endTimestamp, 1000).block();

    assertEquals(1000, plot.size());
  }
}
