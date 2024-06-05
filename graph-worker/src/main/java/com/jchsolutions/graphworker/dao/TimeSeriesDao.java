package com.jchsolutions.graphworker.dao;

import com.jchsolutions.graphworker.model.Point;
import com.jchsolutions.graphworker.service.SqlService;
import io.questdb.cairo.CairoConfiguration;
import io.questdb.cairo.CairoEngine;
import io.questdb.cairo.DefaultCairoConfiguration;
import io.questdb.cairo.security.AllowAllSecurityContext;
import io.questdb.cairo.sql.RecordCursorFactory;
import io.questdb.griffin.SqlException;
import io.questdb.griffin.SqlExecutionContext;
import io.questdb.griffin.SqlExecutionContextImpl;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import io.questdb.cairo.sql.Record;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class TimeSeriesDao {

  CairoConfiguration cairoConfiguration;
  SqlService sqlService;



  public TimeSeriesDao(CairoConfiguration cairoConfiguration, SqlService sqlService) {
    this.cairoConfiguration = cairoConfiguration;
    this.sqlService = sqlService;
  }

  public Mono<List<Point>> getPoints(ZonedDateTime start, ZonedDateTime end) {
    var sql = sqlService.generateSql(start, end);
    var list = new ArrayList<Point>();

    return Mono.create(emitter -> {
      try {
        var engine = new CairoEngine(cairoConfiguration);
        var ctx = new SqlExecutionContextImpl(engine, 1)
          .with(AllowAllSecurityContext.INSTANCE, null);


        try (RecordCursorFactory factory = engine.select(sql, ctx)) {
          var cursor = factory.getCursor(ctx);

          while (cursor.hasNext()) {
            var record = cursor.getRecord();
            list.add(timeXPointMapper(record));
          }

          cursor.close();
          factory.close();
//        compiler.close();
          engine.close();
        }
        emitter.success(list);
      }
      catch (Exception e) {
        emitter.error(e);
      }
    });
  }

  static protected Point timeXPointMapper(Record record) {

    return
      Point
        .builder()
        .x(Long.valueOf(record.getLong(1)).doubleValue()/1000)
        .y(record.getDouble(1))
        .build();
  }

  public static void main(String[] args) throws SqlException {

    final CairoConfiguration configuration = new DefaultCairoConfiguration("/Users/jchicks/QUEST-DB/dev-docker/questdb/data/db");

    String sql = """
      select TIME_STAMP, TEMPERATURE
      FROM WEATHER_DATA
      WHERE TIME_STAMP BETWEEN '2020-01-01T00:00:00Z' AND '2020-01-31T23:59:59Z';
      """;

    try (CairoEngine engine = new CairoEngine(configuration)) {
      final SqlExecutionContext ctx = new SqlExecutionContextImpl(engine, 1)
        .with(AllowAllSecurityContext.INSTANCE, null);

      try (RecordCursorFactory factory = engine.select(sql, ctx)) {
        var cursor = factory.getCursor(ctx);
        while (cursor.hasNext()) {
          var record = cursor.getRecord();

          System.out.println(timeXPointMapper(record));
        }
      }
    }
  }
}
