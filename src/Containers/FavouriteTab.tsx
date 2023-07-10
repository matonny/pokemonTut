import { PokemonDetailedView } from "../Components/PokemonDetailedView";
import { useContext } from "react";
import { Text, View } from "react-native";
import { FavPokeContext } from "../../App";
import { FavPokeContextType } from "../types";

export const FavouriteTab = () => {
  const { favPoke } = useContext(FavPokeContext) as FavPokeContextType;
  console.log(favPoke);
  return (
    <View>
      {!favPoke ? (
        <Text>
          You either don't have a favourite pokemon or there was a problem
          retrieving it
        </Text>
      ) : (
        <PokemonDetailedView id={favPoke} />
      )}
    </View>
  );
};
