import { getPokeDetailsFromWeb } from "./api";
import { getPokeDetailsFromCache, savePokeDetailsInCache } from "./cache";
import { Stats } from "./types";

export const getPokeDetails = async (id: number) => {
  const cachedDetails = await getPokeDetailsFromCache(id);
  if (cachedDetails) {
    return cachedDetails;
  }

  const webDetails = await getPokeDetailsFromWeb(id);
  if (webDetails) {
    savePokeDetailsInCache(webDetails);
  }
  return webDetails;
};

export const statDisplayNames: Record<Stats, string> = {
  hp: "Health",
  attack: "Attack",
  defense: "Block",
  "special-attack": "Special attack",
  "special-defense": "Special block",
  speed: "Speed",
  Weight: "Weight",
};
