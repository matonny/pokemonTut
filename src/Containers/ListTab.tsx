import { createStackNavigator } from "@react-navigation/stack";
import { PokemonList } from "../Components/PokemonList";
import { ListStackParamList } from "../types";
import { StackablePokemonDetails } from "../Components/StackablePokemonDetails";

export const ListTab = () => {
  const Stack = createStackNavigator<ListStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen name="PokemonList" component={PokemonList} />
      <Stack.Screen
        name="PokemonDetails"
        component={StackablePokemonDetails}
        initialParams={{ id: 1 }}
      />
    </Stack.Navigator>
  );
};
