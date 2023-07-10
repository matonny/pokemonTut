import { savePokeDetailsInCache } from "./cache";
import { pokeDetails } from "./types";

const POKE_API = "https://pokeapi.co/api/v2";

const pokemonDetailsPath = (id: number) => `${POKE_API}/pokemon/${id}`;

export const getPokeDetailsFromWeb = async (id: number) => {
  const pokemons = await fetch(pokemonDetailsPath(id))
    .then((data) => {
      if (data.ok) return data.json();
      throw new Error(`request for pokemon with ID ${id} failed`);
    })
    .then(pokeDetails.parse)
    .catch((e) => {
      console.log(e);
      return undefined;
    });
  return pokemons;
};
