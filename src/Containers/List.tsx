import { useEffect, useState } from "react";
import { Text } from "react-native";

export const List = () => {
  const [isLoading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const pageSize = 25;

  const getPokemons = () => {};
  useEffect(() => {
    getPokemons();
  });
  return <Text>Pokemon List</Text>;
};
