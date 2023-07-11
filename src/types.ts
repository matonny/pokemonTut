import { z } from "zod";
import { PokemonDetailedViewProps } from "./Components/PokemonDetailedView";
import { Dispatch } from "react";

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
export const pokeSummary = z.object({
  id: z.number(),
  name: z.string(),
  sprites: sprites,
});

export const pokeStat = z.object({
  base_stat: z.number(),
  stat: z.object({
    name: statNames,
  }),
});

export type Stats = z.infer<typeof statNames>;

export type PokeSummary = z.infer<typeof pokeSummary>;

export const pokeDetails = pokeSummary.extend({
  stats: pokeStat.array().length(6),
  weight: z.number(),
});

export type PokeDetails = z.infer<typeof pokeDetails>;

export const press = z.object({
  position: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  timeStamp: z.number(),
});

export type Press = z.infer<typeof press>;

export const pokePin = press.extend({
  pokemon: z.string(),
});

export type PokePin = z.infer<typeof pokePin>;

export type FavPokeContextType = {
  favPoke: undefined | number;
  setFavPoke: Dispatch<React.SetStateAction<number | undefined>>;
};

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "The passwords do not match",
      });
    }
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
