import { z } from "zod";
import { PokemonDetailedViewProps } from "./Components/PokemonDetailedView";

export type Screens = "Favourite" | "PokeList" | "PokeMap";

export const ListTabNames = {
  pokeList: "Pokemon List",
  pokeDetail: "Pokemon Detail",
};

const statNames = z.enum([
  "hp",
  "attack",
  "defense",
  "special-attack",
  "special-defense",
  "speed",
  "Weight",
]);

export const paginationElem = z.object({
  name: z.string(),
  url: z.string(),
});

export type ListStackParamList = {
  "Pokemon List": undefined;
  "Pokemon Details": PokemonDetailedViewProps;
};
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
    name: statNames,
  }),
});

export type Stats = z.infer<typeof statNames>;

export type PokemonSummary = z.infer<typeof pokemonSummary>;

export const pokemonDetails = pokemonSummary.extend({
  stats: pokemonStat.array().length(6),
  weight: z.number(),
});

export type PokemonDetails = z.infer<typeof pokemonDetails>;

export const pokemonPin = z.object({
  pokemon: z.string(),
  position: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
});

export type PokemonPin = z.infer<typeof pokemonPin>;
