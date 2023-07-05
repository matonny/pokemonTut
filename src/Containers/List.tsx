import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import {
  PaginationElem,
  PokemonSummary,
  paginationElem,
  pokemonSummary,
} from "../types";
import { PokemonSummaryView } from "../Components/PokemonSummaryView";

export const List = () => {
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
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [pokeSummaries, setPokeSummaries] = useState<PokemonSummary[]>([]);
  const [offset, setOffset] = useState(1); //offset start with 1 because API starts with id 1
  const pageSize = 10;

  const getPokemons = async () => {
    setLoading(true);
    const getPokemonSummary = async (id: number) => {
      try {
        const rawPokemonSummary = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}/`
        );
        const parsedPokemonSummary = pokemonSummary.parse(
          await rawPokemonSummary.json()
        );
        console.log(parsedPokemonSummary);
        return parsedPokemonSummary;
      } catch (error) {
        console.log(error);
      }
    };
    const pokemonIds = Array(pageSize)
      .fill(0)
      .map((_, index) => offset + index);
    console.log(pokemonIds);
    const rawPokemons = await Promise.all(
      pokemonIds.map(async (id): Promise<PokemonSummary | undefined> => {
        return getPokemonSummary(id);
      })
    );
    console.log(rawPokemons);
    const filteredPokemons = rawPokemons.filter(
      (item): item is PokemonSummary => !!item
    );
    console.log(filteredPokemons);
    setPokeSummaries((prevPokeSummaries) =>
      prevPokeSummaries.concat(filteredPokemons)
    );
    setOffset((prevOffset) => prevOffset + pageSize);
    setLoading(false);
  };

  useEffect(() => {
    getPokemons();

    return () => {
      setOffset(0);
      setLoading(true);
    };
  }, []);
  return (
    <View style={styles.container}>
      {isLoading && <Text> Loading </Text>}
      <FlatList
        data={pokeSummaries}
        renderItem={({ item }) => (
          <PokemonSummaryView
            name={item.name}
            frontUrl={item.sprites.front_default}
          />
        )}
        style={styles.scrollView}
        onEndReached={getPokemons}
        onEndReachedThreshold={3}
      ></FlatList>
    </View>
  );
};
