export class GraphArgs {
  start: Date = new Date("2019-01-01T00:00:00Z");
  end: Date = new Date();
  threshHold: number = 1000;

  clone(): GraphArgs {
    const graph = new GraphArgs();

    graph.start = this.start;
    graph.end = this.end;
    graph.threshHold = this.threshHold;

    return graph;
  }
}