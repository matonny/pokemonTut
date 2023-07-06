import { useEffect, useState } from "react";
import { PokemonDetails } from "../types";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import { removeFavouritePoke, saveFavouritePoke } from "../cache";
import { getPokeDetails } from "../utils";
import Icon from "react-native-vector-icons/FontAwesome";

type Props = {
  id: number;
  initialFavourite: boolean;
};

export const PokemonDetailedView = ({ id, initialFavourite }: Props) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [pokeData, setPokeData] = useState<null | PokemonDetails>(null);
  const [favourite, setFavourite] = useState(initialFavourite);

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
