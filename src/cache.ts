import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  PokemonDetails,
  PokemonPin,
  pokemonDetails,
  pokemonPin,
} from "./types";
import { z } from "zod";

const getPokemonKey = (id: number) => `POKEMON_${id}`;

const PINS_KEY = "pins";

const FAVOURITE_KEY = "favourite";

export const getPokeDetailsFromCache = async (id: number) => {
  const storedPokemon = await AsyncStorage.getItem(getPokemonKey(id));
  try {
    return pokemonDetails.parse(storedPokemon);
  } catch {
    return undefined;
  }
};
export const savePokeDetailsInCache = (pokemon: PokemonDetails) => {
  const jsonPokemon = JSON.stringify(pokemon);

  AsyncStorage.setItem(getPokemonKey(pokemon.id), jsonPokemon).catch((e) =>
    console.log(e)
  );
};

export const saveFavouritePoke = async (pokemonId: number) => {
  AsyncStorage.setItem(FAVOURITE_KEY, String(pokemonId));
};

export const removeFavouritePoke = () => {
  AsyncStorage.removeItem(FAVOURITE_KEY);
};

export const getFavouritePoke = async () => {
  return AsyncStorage.getItem(FAVOURITE_KEY);
};
export const getPokePinsFromCache = async () => {
  const storedPins = await AsyncStorage.getItem(PINS_KEY);
  if (!storedPins) {
    return [] as PokemonPin[];
  }
  try {
    const result = z.array(pokemonPin).parse(JSON.parse(storedPins));
    return result;
  } catch (e) {
    console.log(e);
    return [] as PokemonPin[];
  }
};

export const addPokemonPinToCache = async (pokemonPin: PokemonPin) => {
  const currPins = await getPokePinsFromCache();
  const updatedPins = currPins.concat(pokemonPin);

  setPinsListInCache(updatedPins);
};
export const removePokemonPinFromCache = async (pinId: number) => {
  const currPins = await getPokePinsFromCache();
  const filteredPins = currPins.filter((pin) => pin.timeStamp != pinId);

  setPinsListInCache(filteredPins);
};

const setPinsListInCache = async (pinsList: PokemonPin[]) => {
  try {
    AsyncStorage.setItem(PINS_KEY, JSON.stringify(pinsList));
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
