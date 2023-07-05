import { PokemonDetailedView } from "../Components/PokemonDetailedView";
import { useEffect, useState } from "react";
import { getFavouritePokemon, saveFavouritePokemon } from "../cache";
import { Text, View } from "react-native";

export const Favourite = () => {
  const [favouriteId, setFavouriteId] = useState<number | null>(null);
  useEffect(() => {
    const temp = async () => {
      const savedFavourite = await getFavouritePokemon();
      if (savedFavourite) {
        setFavouriteId(Number(savedFavourite));
      } else {
        setFavouriteId(null);
      }
    };
    temp();
    return () => {
      setFavouriteId(null);
    };
  }, []);

  return (
    <View>
      {!favouriteId && (
        <Text>
          You either don't have a favourite pokemon or there was a problem
          retrieving it
        </Text>
      )}
      {favouriteId && (
        <PokemonDetailedView id={favouriteId} initialFavourite={true} />
      )}
    </View>
  );
};
