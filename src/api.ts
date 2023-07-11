import { child, get, getDatabase, ref } from "firebase/database";
import { pokeDetails } from "./types";
import analytics from "@react-native-firebase/analytics";

// const POKE_API = "https://pokeapi.co/api/v2";

// const pokemonDetailsPath = (id: number) => `${POKE_API}/pokemon/${id}`;

export const getPokeDetailsFromWeb = async (id: number) => {
  const db = getDatabase();

  // const pokemon = await fetch(pokemonDetailsPath(id))
  //   .then((data) => {
  //     if (data.ok) return data.json();
  //     throw new Error(`request for pokemon with ID ${id} failed`);
  //   })
  //   .then(pokeDetails.parse)
  //   .catch((e) => {
  //     console.log(e);
  //     return undefined;
  //   });
  return get(child(ref(db), "pokemons/" + id))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const parsedPokemon = pokeDetails.parse(snapshot.val());
        return parsedPokemon;
      }
      {
        console.log("No data available");
        return undefined;
      }
    })
    .catch((error) => {
      console.error(error);
      return undefined;
    });
};
