package com.jchsolutions.graphworker.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.jchsolutions.graphworker.model.Point;


import java.io.IOException;

public class PointSerializer extends StdSerializer<Point> {

  public PointSerializer() {
    this(Point.class);
  }

  public PointSerializer(Class<Point> t) {
    super(t);
  }

  @Override
  public void serialize(Point value, JsonGenerator gen, SerializerProvider provider) throws IOException {
    gen.writeStartArray();
    gen.writeNumber(value.getX().longValue());
    gen.writeNumber(value.getY().longValue());
    gen.writeEndArray();
  }
}