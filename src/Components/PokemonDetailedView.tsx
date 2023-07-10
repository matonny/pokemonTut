import { useContext, useEffect, useState } from "react";
import { FavPokeContextType, PokemonDetails } from "../types";
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
import { PokemonStats } from "./PokemonStats";
import { FavPokeContext } from "../Contexts/FavPokeContext";

export type PokemonDetailedViewProps = {
  id: number;
};

export const PokemonDetailedView = ({ id }: PokemonDetailedViewProps) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pokeData, setPokeData] = useState<undefined | PokemonDetails>(
    undefined
  );
  const { favPoke, setFavPoke } = useContext(
    FavPokeContext
  ) as FavPokeContextType;

  useEffect(() => {
    getPokeDetails(id)
      .then(setPokeData)
      .then(() => setLoading(false));

    return () => {
      setPokeData(undefined);
      setError(false);
      setLoading(true);
    };
  }, [id]);

  return (
    <View>
      {error && <Text> An error occurred {error}</Text>}
      {loading && <ActivityIndicator size="large" />}
      {pokeData && (
        <View style={styles.container}>
          <Pressable
            onPress={() => {
              setFavPoke(() => (favPoke === id ? undefined : id));
              favPoke !== null ? removeFavouritePoke() : saveFavouritePoke(id);
            }}
          >
            <Icon
              style={styles.star}
              name={"star"}
              size={45}
              color={id === favPoke ? "#f5f187" : "grey"}
            />
          </Pressable>
          <Image
            source={{
              width: 250,
              height: 250,
              uri: pokeData.sprites.front_default,
            }}
            style={styles.image}
          />
          <Text style={styles.name}>{pokeData.name}</Text>
          <PokemonStats stats={pokeData.stats} weight={pokeData.weight} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },
  scrollView: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
  name: {
    textAlign: "center",
    textTransform: "uppercase",
  },
  star: {},
  image: {
    marginHorizontal: "auto",
  },
});
