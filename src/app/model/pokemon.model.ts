import { Sprites } from "./sprites.model";
import { Stats } from "./stats.model";
import { Type } from "./type.model";

export interface Pokemon {
  id: number;
  name: string;
  stats: Stats;
  sprites: Sprites;
  types: Type[];
}