import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

export const List = () => {
  const [isLoading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const pageSize = 25;

  const getPokemons = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=${pageSize}&offset=${offset}`
      );
      const json = await response.json();
      setOffset((prevOffset) => prevOffset + pageSize);
      console.log(json);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
      <Text>Pokemon List</Text>
      <Button onPress={getPokemons} title="Fetch more"></Button>
    </View>
  );
};
