package com.jchsolutions.graphworker.service;

import org.jooq.*;
import org.jooq.conf.ParamType;
import org.jooq.impl.DSL;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.ZonedDateTime;

import static org.jooq.impl.DSL.field;

@Service
public class SqlService {
  public String generateSql(ZonedDateTime start, ZonedDateTime end) {

    DSLContext create = DSL.using(SQLDialect.DEFAULT);
    Field<Timestamp> TIME_STAMP = field("TIME_STAMP", Timestamp.class);
    Field<Double> TEMPERATURE = field("TEMPERATURE", Double.class);

    Query query = create
      .select(TIME_STAMP, TEMPERATURE)
      .from("WEATHER_DATA")
      .where(TIME_STAMP.between(toTimestamp(start), toTimestamp(end)));

    return query.getSQL(ParamType.INLINED);
  }

  protected Timestamp toTimestamp(ZonedDateTime zonedDateTime) {
    return Timestamp.from(zonedDateTime.toInstant());
  }
}
