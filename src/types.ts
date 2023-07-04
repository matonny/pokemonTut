import { z } from "zod";

export type Screens = "Favourite" | "PokeList" | "PokeMap";

export const paginationElem = z.object({
  name: z.string(),
  url: z.string(),
});

export type PaginationElem = z.infer<typeof paginationElem>;

const sprites = z.object({
  front_default: z.string(),
  back_default: z.string(),
});
export const pokemonSummary = z.object({
  id: z.number(),
  name: z.string(),
  sprites: sprites,
});

export type PokemonSummary = z.infer<typeof pokemonSummary>;

export const pokemonDetails = pokemonSummary.extend({});
