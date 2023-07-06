import AsyncStorage from "@react-native-async-storage/async-storage";
import { PokemonDetails, pokemonDetails } from "./types";

const getPokemonKey = (id: number) => `POKEMON_${id}`;

const FAVOURITE_KEY = "favourite";

export const getPokeDetailsFromCache = async (id: number) => {
  const storedPokemon = await AsyncStorage.getItem(getPokemonKey(id));
  try {
    return pokemonDetails.parse(storedPokemon);
  } catch {
    return null;
  }
};
export const savePokeDetailsInCache = (pokemon: PokemonDetails) => {
  const jsonPokemon = JSON.stringify(pokemon);

  AsyncStorage.setItem(getPokemonKey(pokemon.id), jsonPokemon).catch((e) =>
    console.log(e)
  );
};

export const saveFavouritePoke = (pokemonId: number) => {
  AsyncStorage.setItem(FAVOURITE_KEY, String(pokemonId));
};

export const removeFavouritePoke = () => {
  AsyncStorage.removeItem(FAVOURITE_KEY);
};

export const getFavouritePoke = async () => {
  return AsyncStorage.getItem(FAVOURITE_KEY);
};
