import {GraphArgs} from "../model/GraphArgs";

export type GraphModel = {
  graph: GraphArgs
}

export type SeriesModel = {
  series: [number, number][];
}

export type HandleClick = {
  onClick(num: number): void;
}

export type HandleChange = {
  onChange(graphArgs: GraphArgs): void;
}