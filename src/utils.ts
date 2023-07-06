import { getPokeDetailsFromWeb } from "./api";
import { getPokeDetailsFromCache, savePokeDetailsInCache } from "./cache";

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
