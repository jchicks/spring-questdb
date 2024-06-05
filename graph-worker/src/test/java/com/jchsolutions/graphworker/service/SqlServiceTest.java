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
public class SqlServiceTest {

  @Autowired
  SqlService sqlService;


  @Test
  public void testSql() {
    var startTimestamp = ZonedDateTime.parse("2020-01-01T00:00:00Z");
    var endTimestamp = ZonedDateTime.parse("2020-01-31T23:59:59Z");

    var expected = "select TIME_STAMP, TEMPERATURE from WEATHER_DATA where TIME_STAMP between timestamp '2020-01-01 01:00:00.0' and timestamp '2020-02-01 00:59:59.0'";
    var sql = sqlService.generateSql(startTimestamp, endTimestamp);

    assertEquals(sql, expected);
  }
}
