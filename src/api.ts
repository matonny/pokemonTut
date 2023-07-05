import { savePokemonInCache } from "./cache";
import { pokemonDetails } from "./types";

const POKE_API = "https://pokeapi.co/api/v2";

const pokemonDetailsPath = (id: number) => `${POKE_API}/pokemon/${id}`;

export const getPokeDetails = async (id: number) => {
  const pokeDetails = await fetch(pokemonDetailsPath(id))
    .then((data) => data.json())
    .then(pokemonDetails.parse);

  savePokemonInCache(pokeDetails);

  return pokeDetails;
};
