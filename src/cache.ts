import AsyncStorage from "@react-native-async-storage/async-storage";
import { PokeDetails, PokePin, pokeDetails, pokePin } from "./types";
import { z } from "zod";

const getPokeKey = (id: number) => `POKEMON_${id}`;

const PINS_KEY = "pins";

const FAVOURITE_KEY = "favourite";

export const getPokeDetailsFromCache = async (id: number) => {
  const storedPokemon = await AsyncStorage.getItem(getPokeKey(id));
  try {
    return pokeDetails.parse(storedPokemon);
  } catch {
    return undefined;
  }
};
export const savePokeDetailsInCache = (pokemon: PokeDetails) => {
  const jsonPokemon = JSON.stringify(pokemon);

  AsyncStorage.setItem(getPokeKey(pokemon.id), jsonPokemon).catch((e) =>
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
    return [] as PokePin[];
  }
  try {
    const result = z.array(pokePin).parse(JSON.parse(storedPins));
    return result;
  } catch (e) {
    console.log(e);
    return [] as PokePin[];
  }
};

export const addPokePinToCache = async (pokemonPin: PokePin) => {
  const currPins = await getPokePinsFromCache();
  const updatedPins = currPins.concat(pokemonPin);

  setPinsListInCache(updatedPins);
};
export const removePokePinFromCache = async (pinId: number) => {
  const currPins = await getPokePinsFromCache();
  const filteredPins = currPins.filter((pin) => pin.timeStamp != pinId);

  setPinsListInCache(filteredPins);
};

const setPinsListInCache = async (pinsList: PokePin[]) => {
  try {
    AsyncStorage.setItem(PINS_KEY, JSON.stringify(pinsList));
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
