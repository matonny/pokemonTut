import AsyncStorage from "@react-native-async-storage/async-storage";
import { PokemonDetails, pokemonDetails } from "./types";

const getPokemonKey = (id: number) => `POKEMON_${id}`;

const FAVOURITE_KEY = "favourite";

export const getPokemonDetailsFromCache = async (id: number) => {
  const storedPokemon = await AsyncStorage.getItem(getPokemonKey(id));
  try {
    return pokemonDetails.parse(storedPokemon);
  } catch {
    return null;
  }
};
export const savePokemonInCache = (pokemon: PokemonDetails) => {
  const jsonPokemon = JSON.stringify(pokemon);
  AsyncStorage.setItem(getPokemonKey(pokemon.id), jsonPokemon).catch((e) =>
    console.log(e)
  );
};

export const saveFavouritePokemon = (pokemonId: number) => {
  AsyncStorage.setItem(FAVOURITE_KEY, String(pokemonId));
};

export const removeFavouritePokemon = () => {
  AsyncStorage.removeItem(FAVOURITE_KEY);
};

export const getFavouritePokemon = async () => {
  return AsyncStorage.getItem(FAVOURITE_KEY);
};
