import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ListStackParamList, PokemonSummary } from "../types";
import { PokemonSummaryView } from "./PokemonSummaryView";
import { getPokeDetails } from "../utils";
import { StackScreenProps } from "@react-navigation/stack";

export const PokemonList = ({
  navigation,
}: StackScreenProps<ListStackParamList, "Pokemon List">) => {
  const PAGE_SIZE = 10;
  const API_OFFSET = 1; // API indexes pokemons starting with 1

  const [isLoading, setLoading] = useState(true);
  const [lastPokeReached, setLastPokeReached] = useState(false);
  const [pokeSummaries, setPokeSummaries] = useState<PokemonSummary[]>([]);
  const offset = useRef(API_OFFSET);

  const getPokemons = async () => {
    setLoading(true);
    const pokemonIds = Array(PAGE_SIZE)
      .fill(0)
      .map((_, index) => offset.current + index);

    const rawPokemons = await Promise.all(
      pokemonIds.map(async (id): Promise<PokemonSummary | undefined> => {
        return getPokeDetails(id);
      })
    );
    const filteredPokemons = rawPokemons.filter(
      (item): item is PokemonSummary => !!item
    );
    if (filteredPokemons.length === 0) {
      setLastPokeReached(true);
      setLoading(false);
      return;
    }
    setPokeSummaries((prevPokeSummaries) =>
      prevPokeSummaries.concat(filteredPokemons)
    );
    offset.current = offset.current + PAGE_SIZE;
    setLoading(false);
  };

  useEffect(() => {
    getPokemons();

    return () => {
      offset.current = API_OFFSET;
      setLoading(true);
    };
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={pokeSummaries}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              navigation.navigate("Pokemon Details", { id: item.id });
            }}
          >
            <PokemonSummaryView
              name={item.name}
              frontUrl={item.sprites.front_default}
            />
          </Pressable>
        )}
        style={styles.scrollView}
        onEndReached={() => {
          if (!lastPokeReached) {
            getPokemons();
          }
        }}
        onEndReachedThreshold={0.5}
        bounces={false}
      ></FlatList>
      {isLoading && <ActivityIndicator size="large" />}
      {lastPokeReached && <Text>You reached the last Pokemon</Text>}
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
