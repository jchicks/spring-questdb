package com.jchsolutions.graphworker.web;

import com.jchsolutions.graphworker.GraphService;
import com.jchsolutions.graphworker.model.Point;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;

@RestController
public class GraphController {

  GraphService graphService;

  public GraphController(GraphService graphService) {
    this.graphService = graphService;
  }

  @GetMapping("/points")
  public Mono<List<Point>> getPoints() {

    var points = Arrays.asList(
      Point.builder().x(1.0).y(2.0).build(),
      Point.builder().x(3.0).y(4.0).build()
    );

    return null;
  }
}
