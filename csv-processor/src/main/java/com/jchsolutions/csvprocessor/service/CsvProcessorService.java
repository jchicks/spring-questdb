package com.jchsolutions.csvprocessor.service;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Date;

import static com.jchsolutions.csvprocessor.config.CsvConfig.Headers.*;
import static com.jchsolutions.csvprocessor.config.CsvConfig.OutputHeaders.*;
import static java.lang.String.format;


@Slf4j
@Service
public class CsvProcessorService {

  Iterable<CSVRecord> records;
  CSVPrinter csvPrinter;

  public CsvProcessorService(Iterable<CSVRecord> records, CSVPrinter csvPrinter) {
    this.records = records;
    this.csvPrinter = csvPrinter;
  }

  @PostConstruct
  public void start() throws IOException {
    log.info("start...");

    csvPrinter.printRecord(ID, TIME_STAMP, TEMPERATURE, DEW_POINT);

    for (var csvRecord : records) {
      var id = csvRecord.get(INDEX);
      var date = csvRecord.get(DATE);
      var hour = csvRecord.get(HOUR);
      var airTemperature = csvRecord.get(AIR_TEMPERATURE_DRY_BULB);
      var dewPointTemperature = csvRecord.get(DEW_POINT_TEMPERATURE);


      var timestamp = format("%sT%s:00.000000Z", date, hour);
//      log.info("line: {}", timestamp);

      try {
        var temperature = Double.parseDouble(airTemperature);

        if (-1000.0 < temperature && temperature < 1000.0) {
          csvPrinter.printRecord(id, timestamp, airTemperature, dewPointTemperature);
        }
      }
      catch (Exception e) {
        log.error("error printing", e);
      }
    }

    log.info("end...");
  }
}
