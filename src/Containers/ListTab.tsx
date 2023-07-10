import { createStackNavigator } from "@react-navigation/stack";
import { PokemonList } from "../Components/PokemonList";
import { ListStackParamList } from "../types";
import { StackablePokemonDetails } from "../Components/StackablePokemonDetails";

export const ListTab = () => {
  const Stack = createStackNavigator<ListStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Pokemon List" component={PokemonList} />
      <Stack.Screen
        name="Pokemon Details"
        component={StackablePokemonDetails}
        initialParams={{ id: 1 }}
      />
    </Stack.Navigator>
  );
};
