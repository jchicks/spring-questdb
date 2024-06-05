package com.jchsolutions.graphworker.dao;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.ZonedDateTime;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

import static org.junit.jupiter.api.Assertions.assertEquals;

//@RunWith(SpringRunner.class)
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@TestPropertySource("/application-test.yaml")
public class TimeSeriesDaoTest {

  @Autowired
  TimeSeriesDao timeSeriesDao;

  @Test
  public void testSql() {
    var startTimestamp = ZonedDateTime.parse("2020-01-01T00:00:00Z");
    var endTimestamp = ZonedDateTime.parse("2020-01-31T23:59:59Z");

    var points = timeSeriesDao.getPoints(startTimestamp, endTimestamp).block();
    var points2 = timeSeriesDao.getPoints(startTimestamp, endTimestamp).block();

    assertEquals(points.size(), 108624);
  }

  @Test
  public void parallelTestSql() throws InterruptedException {

    ExecutorService executorService = Executors.newFixedThreadPool(10);

    final AtomicInteger ctr = new AtomicInteger();

    Runnable task = () -> {
        var startTimestamp = ZonedDateTime.parse("2020-01-01T00:00:00Z");
        var endTimestamp = ZonedDateTime.parse("2020-01-31T23:59:59Z");

        var points = timeSeriesDao.getPoints(startTimestamp, endTimestamp).block();

        ctr.incrementAndGet();
    };

    for (int i=0; i<10; ++i) {
      executorService.submit(task);
    }

    executorService.shutdown();

    if (!executorService.awaitTermination(300, TimeUnit.SECONDS)) {
      executorService.shutdownNow();
      if (!executorService.awaitTermination(300, TimeUnit.SECONDS)) {
        System.err.println("Tasks did not finish");
      }
    }

    System.out.println("Tasks finished");

  }
}
