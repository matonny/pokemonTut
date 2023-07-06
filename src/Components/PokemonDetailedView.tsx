import { useEffect, useState } from "react";
import { ListStackParamList, PokemonDetails } from "../types";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import {
  getFavouritePoke,
  removeFavouritePoke,
  saveFavouritePoke,
} from "../cache";
import { getPokeDetails } from "../utils";
import Icon from "react-native-vector-icons/FontAwesome";
import { StackScreenProps } from "@react-navigation/stack";

export type PokemonDetailedViewProps = {
  id: number;
};

export const PokemonDetailedView = ({ id }: PokemonDetailedViewProps) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [pokeData, setPokeData] = useState<null | PokemonDetails>(null);
  const [favourite, setFavourite] = useState(Number(getFavouritePoke()) === id);

  useEffect(() => {
    getPokeDetails(id)
      .then(setPokeData)
      .then(() => setLoading(false));

    return () => {
      setPokeData(null);
      setError("false");
      setLoading(true);
    };
  }, []);

  return (
    <View>
      {error && <Text> An error occurred {error}</Text>}
      {loading && <ActivityIndicator size="large" />}
      {pokeData && (
        <>
          <Text>{pokeData.name}</Text>
          <Pressable
            onPress={() => {
              setFavourite((prevFav) => !prevFav);
              favourite
                ? removeFavouritePoke()
                : saveFavouritePoke(pokeData.id);
            }}
          >
            <Icon
              name={"star"}
              size={25}
              color={favourite ? "yellow" : "grey"}
            ></Icon>
          </Pressable>
          <Image
            source={{
              width: 100,
              height: 100,
              uri: pokeData.sprites.front_default,
            }}
          />
          <Text>Weight: {pokeData.weight}</Text>
          {pokeData.stats.map((stat) => {
            return (
              <Text
                key={stat.stat.name}
              >{`${stat.stat.name}: ${stat.base_stat}`}</Text>
            );
          })}
        </>
      )}
    </View>
  );
};
