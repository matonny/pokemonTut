import { useEffect, useState } from "react";
import { PokemonDetails } from "../types";
import { ActivityIndicator, Button, Image, Text, View } from "react-native";
import { getPokemonDetailsFromCache } from "../cache";
import { getPokeDetails } from "../api";
import Icon from "react-native-vector-icons/FontAwesome";

type Props = {
  id: number;
  isFavourite: boolean;
};

export const PokemonDetailedView = ({ id }: Props) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [pokeData, setPokeData] = useState<null | PokemonDetails>(null);

  useEffect(() => {
    getPokemonDetailsFromCache(id)
      .then((v) => (v === null ? getPokeDetails(id) : v))
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
          <Icon
            name={"star"}
            color={"yellow"}
            onPress={() => setFavourite(pokeData.id)}
          ></Icon>
          <Image
            source={{
              width: 100,
              height: 100,
              uri: pokeData.sprites.front_default,
            }}
          />
          <Text>Weight: {pokeData.weight}</Text>
          {pokeData.stats.map((stat) => {
            return <Text>{`${stat.stat.name}: ${stat.base_stat}`}</Text>;
          })}
        </>
      )}
    </View>
  );
};
