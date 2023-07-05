import { z } from "zod";

export type Screens = "Favourite" | "PokeList" | "PokeMap";

export const paginationElem = z.object({
  name: z.string(),
  url: z.string(),
});

export type PaginationElem = z.infer<typeof paginationElem>;

const sprites = z.object({
  front_default: z.string(),
  back_default: z.string().nullable(),
});
export const pokemonSummary = z.object({
  id: z.number(),
  name: z.string(),
  sprites: sprites,
});

export const pokemonStat = z.object({
  base_stat: z.number(),
  stat: z.object({
    name: z.string(),
  }),
});
export type PokemonSummary = z.infer<typeof pokemonSummary>;

export const pokemonDetails = pokemonSummary.extend({
  stats: pokemonStat.array().length(6),
  weight: z.number(),
});

export type PokemonDetails = z.infer<typeof pokemonDetails>;
