package com.jchsolutions.graphworker;

import com.jchsolutions.graphworker.dao.TimeSeriesDao;
import org.springframework.stereotype.Service;

@Service
public class GraphService {

  TimeSeriesDao timeSeriesDao;

  public GraphService(TimeSeriesDao timeSeriesDao) {
    this.timeSeriesDao = timeSeriesDao;
  }
}
