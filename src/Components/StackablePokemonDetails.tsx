import { StackScreenProps } from "@react-navigation/stack";
import { ListStackParamList } from "../types";
import { PokemonDetailedView } from "./PokemonDetailedView";

export const StackablePokemonDetails = ({
  route,
}: StackScreenProps<ListStackParamList, "Pokemon Details">) => {
  return <PokemonDetailedView id={route.params.id} />;
};
