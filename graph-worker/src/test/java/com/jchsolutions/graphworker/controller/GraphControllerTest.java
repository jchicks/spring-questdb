package com.jchsolutions.graphworker.controller;

import com.jchsolutions.graphworker.cfg.QuestDbConfig;
import com.jchsolutions.graphworker.cfg.WebConfig;
import com.jchsolutions.graphworker.dao.TimeSeriesDao;
import com.jchsolutions.graphworker.model.Point;
import com.jchsolutions.graphworker.service.GraphService;
import com.jchsolutions.graphworker.service.SqlService;
import com.jchsolutions.graphworker.web.GraphController;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.reactive.server.WebTestClient;

@ExtendWith(SpringExtension.class)
@WebFluxTest(GraphController.class)
@Import({GraphService.class, TimeSeriesDao.class, SqlService.class, QuestDbConfig.class})
@TestPropertySource("/application-test.yaml")
public class GraphControllerTest {

  @Autowired
  private WebTestClient webTestClient;

  @Test
  public void testValidDateRange() throws Exception {
    webTestClient
      .get()
      .uri(uriBuilder ->
        uriBuilder.path("/plot")
          .queryParam("start", "2019-01-01T00:00:00Z")
          .queryParam("end", "2020-12-31T23:59:59Z")
          .queryParam("threshold", "1000")
          .build())
      .exchange()
      .expectStatus()
      .isOk()
      .expectHeader()
      .contentType("application/json")
      .expectBodyList(Point.class)
      .hasSize(1000);
  }

//  @Test
//  public void testInvalidDateRange() throws Exception {
//    mockMvc.perform(get("/date-range")
//        .param("start", "2020-12-31T23:59:59Z")
//        .param("end", "2020-01-01T00:00:00Z")
//        .param("threshold", "10"))
//      .andExpect(status().isBadRequest())
//      .andExpect(content().string("Start date must be before or equal to end date."));
//  }

}
