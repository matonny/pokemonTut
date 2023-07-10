import { savePokeDetailsInCache } from "./cache";
import { pokemonDetails } from "./types";

const POKE_API = "https://pokeapi.co/api/v2";

const pokemonDetailsPath = (id: number) => `${POKE_API}/pokemon/${id}`;

export const getPokeDetailsFromWeb = async (id: number) => {
  const pokeDetails = await fetch(pokemonDetailsPath(id))
    .then((data) => {
      if (data.ok) return data.json();
      throw new Error(`request for pokemon with ID ${id} failed`);
    })
    .then(pokemonDetails.parse)
    .catch((e) => {
      console.log(e);
      return undefined;
    });
  return pokeDetails;
};
