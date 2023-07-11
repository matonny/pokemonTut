import { getDatabase, ref, set } from "firebase/database";
import { getPokeDetailsFromWeb } from "./api";
import { pokeDetails } from "./types";

export const copyPokemonsToFirebase = async (pokemonId: number) => {
  console.log("Copying pokemon " + pokemonId);
  const db = getDatabase();
  try {
    const pokemon = pokeDetails.parse(await getPokeDetailsFromWeb(pokemonId));

    set(ref(db, "pokemons/" + pokemon.id), pokemon);
    copyPokemonsToFirebase(pokemonId + 1);
  } catch (e) {
    console.log(e);
  }
};
