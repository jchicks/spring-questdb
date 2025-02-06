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
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import io.questdb.cairo.sql.Record;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.locks.ReentrantLock;

@Service
@RequiredArgsConstructor
public class TimeSeriesDao {

  private final CairoConfiguration cairoConfiguration;
  private final SqlService sqlService;
  private final ReentrantLock lock = new ReentrantLock();

  public Mono<List<Point>> getPoints(ZonedDateTime start, ZonedDateTime end) {
    var sql = sqlService.generateSql(start, end);
    var list = new ArrayList<Point>();

    return Mono.create(emitter -> {
      try {
        lock.lock();
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
          engine.close();
        }
        emitter.success(list);
      }
      catch (Exception e) {
        emitter.error(e);
      }
      finally {
        lock.unlock();
      }
    });
  }

  static protected Point timeXPointMapper(Record record) {
    return
      Point
        .builder()
        .x((double)record.getTimestamp(0)/1000)
        .y(record.getDouble(1))
        .build();
  }
}
