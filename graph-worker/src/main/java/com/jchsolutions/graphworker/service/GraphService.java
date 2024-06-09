package com.jchsolutions.graphworker.service;

import com.jchsolutions.graphworker.dao.TimeSeriesDao;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.jchsolutions.graphworker.model.Point;
import reactor.core.publisher.Mono;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

import static java.lang.Math.abs;
import static java.lang.Math.floor;

@Slf4j
@Service
public class GraphService {

  TimeSeriesDao timeSeriesDao;

  public GraphService(TimeSeriesDao timeSeriesDao) {
    this.timeSeriesDao = timeSeriesDao;
  }

  public Mono<List<Point>> plot(ZonedDateTime start, ZonedDateTime end, Integer threshold) {
    return timeSeriesDao
      .getPoints(start, end)
      .map(points -> downSample(points, threshold));
  }

  protected List<Point> downSample(List<Point> data, Integer threshold) {

    log.info(Thread.currentThread().getName() + " running decimation");

    var    sampled   = new ArrayList<Point>();
    double every     = ((double)(data.size() - 2)) / (threshold - 2);
    int    currIndex = 0;  // initially a is the first point in the triangle
    int    nextIndex = 0;
    double area;
    Point  maxAreaPoint = null;

    sampled.add(data.get(currIndex));

    for (int i = 0; i < threshold - 2; ++i) {

      // Calculate point average for next bucket (containing c)
      double avgX = 0;
      double avgY = 0;

      int avgRangeStart = (int) floor((i + 1) * every) + 1;
      int avgRangeEnd = (int) floor((i + 2) * every) + 1;

      avgRangeEnd = Math.min(avgRangeEnd, data.size());

      double avgRangeLength = avgRangeEnd - avgRangeStart;


      while (avgRangeStart < avgRangeEnd) {
        avgX += (double)data.get(avgRangeStart).getX();
        avgY += (double)data.get(avgRangeStart).getY();

        ++avgRangeStart;
      }

      avgX = avgX / avgRangeLength;
      avgY = avgY / avgRangeLength;

      // Get the range for this bucket
      int rangeOffs = (int) (floor(i * every) + 1);
      int rangeTo = (int) (floor((i + 1) * every) + 1);

      // Point a
      Point point = data.get(currIndex);

      double maxArea = area = -1;

      while (rangeOffs < rangeTo) {
        // Calculate triangle area over three buckets
        // (base*height)/2
        area = abs(((double)point.getX() - avgX) * ((double)data.get(rangeOffs).getY() - (double)point.getY()) -
          ((double)point.getX() - (double)data.get(rangeOffs).getX()) * (avgY - (double)point.getY())) *
          0.5;

        if (area > maxArea) {
          maxArea = area;
          maxAreaPoint = data.get(rangeOffs);
          nextIndex = rangeOffs; // Next a is this b
        }

        ++rangeOffs;
      }

      sampled.add(maxAreaPoint); // Pick this point from the bucket
      currIndex = nextIndex; // This a is the next a (chosen b)
    }

    sampled.add(data.get(data.size() - 1)); // Always add last point

    log.info(Thread.currentThread().getName() + " finished decimation");

    return  sampled;
  }
}
