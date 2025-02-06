package com.jchsolutions.graphworker.web;


import com.jchsolutions.graphworker.model.Point;
import com.jchsolutions.graphworker.service.GraphService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.time.ZonedDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class GraphController {

  private final GraphService graphService;

  @GetMapping("/plot")
  public Mono<List<Point>> plot(
    @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) ZonedDateTime startDate,
    @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) ZonedDateTime endDate,
    @RequestParam("threshold") int threshold)
  {
    return graphService.plot(startDate, endDate, threshold);
  }
}
