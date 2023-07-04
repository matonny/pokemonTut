import { useEffect, useState } from "react";
import { Button, FlatList, Text, View } from "react-native";
import {
  PaginationElem,
  PokemonSummary,
  paginationElem,
  pokemonSummary,
} from "../types";
import { PokemonSummaryView } from "../Components/PokemonSummaryView";

export const List = () => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pokeSummaries, setPokeSummaries] = useState<PokemonSummary[]>([]);
  const [offset, setOffset] = useState(0);
  const pageSize = 25;

  const getPokemons = async () => {
    try {
      const rawPokemonsURL = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=${pageSize}&offset=${offset}`
      );
      const parsedPokemonsURL = await rawPokemonsURL.json();

      const currPaginated: PaginationElem[] = parsedPokemonsURL.results.map(
        paginationElem.parse
      );
      const rawPokemons = await Promise.all(
        currPaginated.map(async (paginatedItem): Promise<PokemonSummary> => {
          const rawPokemon = await fetch(paginatedItem.url);
          const parsedPokemon = await rawPokemon.json();
          console.log(parsedPokemon);
          return pokemonSummary.parse(parsedPokemon);
        })
      );
      setPokeSummaries((prevPokeSummaries) =>
        prevPokeSummaries.concat(rawPokemons)
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      console.log(pokeSummaries);
    }
  };

  useEffect(() => {
    getPokemons();

    return () => {
      setOffset(0);
      setLoading(true);
    };
  }, []);
  return (
    <View>
      {isLoading && <Text> Loading </Text>}
      <FlatList
        data={pokeSummaries}
        renderItem={({ item }) => (
          <PokemonSummaryView
            name={item.name}
            frontUrl={item.sprites.front_default}
          />
        )}
      ></FlatList>
    </View>
  );
};
