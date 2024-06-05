package com.jchsolutions.csvprocessor.config;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.*;

@Configuration
public class CsvConfig {
  @Value("${constants.file-path}")
  String filePath;

  @Value("${constants.output-path}")
  String outputFilePath;

  public static enum Headers {
    INDEX,
    DATE,
    HOUR,
    TOTAL_PRECIPITATION,
    ATMOSPHERIC_PRESSURE_AT_STATION_HEIGHT,
    ATMOSPHERIC_PRESSURE_MAX_IN_THE_PREVIOUS_HOUR,
    ATMOSPHERIC_PRESSURE_MIN_IN_THE_PREVIOUS_HOUR,
    RADIATION,
    AIR_TEMPERATURE_DRY_BULB,
    DEW_POINT_TEMPERATURE,
    MAX_TEMPERATURE_IN_THE_PREVIOUS_HOUR,
    MIN_TEMPERATURE_IN_THE_PREVIOUS_HOUR,
    DEW_TEMPERATURE_MAX_IN_THE_PREVIOUS_HOUR,
    DEW_TEMPERATURE_MIN_IN_THE_PREVIOUS_HOUR,
    RELATIVE_HUMIDITY_MAX_IN_THE_PREVIOUS_HOUR,
    RELATIVE_HUMIDITY_MIN_IN_THE_PREVIOUS_HOUR,
    AIR_RELATIVE_HUMIDITY,
    WIND_DIRECTION,
    WIND_RAJADA_MAXIMA,
    WIND_SPEED,
    REGION,
    STATE,
    STATION,
    STATION_CODE,
    LATITUDE,
    LONGITUDE,
    HEIGHT
  }


  public static enum OutputHeaders {
    ID,
    TIME_STAMP,
    TEMPERATURE,
    DEW_POINT
  }

  @Bean
  public Iterable<CSVRecord> csvParser() throws IOException {
    Reader reader = new FileReader(filePath);
    return CSVFormat.RFC4180
      .builder()
      .setHeader(Headers.class)
      .build()
      .parse(reader);
  }

  @Bean
  public CSVPrinter printer() throws IOException {
    return new CSVPrinter(new FileWriter(outputFilePath), CSVFormat.EXCEL);
  }
}
