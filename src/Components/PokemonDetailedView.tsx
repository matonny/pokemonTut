import { useContext, useEffect, useState } from "react";
import { PokemonDetails } from "../types";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { removeFavouritePoke, saveFavouritePoke } from "../cache";
import { getPokeDetails } from "../utils";
import Icon from "react-native-vector-icons/FontAwesome";
import { FavPokeContext, FavPokeContextType } from "../../App";

export type PokemonDetailedViewProps = {
  id: number;
};

export const PokemonDetailedView = ({ id }: PokemonDetailedViewProps) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pokeData, setPokeData] = useState<null | PokemonDetails>(null);
  const { favPoke, setFavPoke } = useContext(
    FavPokeContext
  ) as FavPokeContextType;

  useEffect(() => {
    getPokeDetails(id)
      .then(setPokeData)
      .then(() => setLoading(false));

    return () => {
      setPokeData(null);
      setError(false);
      setLoading(true);
    };
  }, [id]);

  return (
    <View>
      {error && <Text> An error occurred {error}</Text>}
      {loading && <ActivityIndicator size="large" />}
      {pokeData && (
        <View>
          <Text>{pokeData.name}</Text>
          <Pressable
            onPress={() => {
              setFavPoke(() => (favPoke === id ? null : id));
              favPoke !== null ? removeFavouritePoke() : saveFavouritePoke(id);
            }}
          >
            <Icon
              name={"star"}
              size={25}
              color={id === favPoke ? "yellow" : "grey"}
            />
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
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});
