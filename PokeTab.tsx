import { Favourite } from "./src/Containers/FavouriteTab";
import { PokemonList } from "./src/Components/PokemonList";
import { PokeMap } from "./src/Containers/MapTab";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ListTab } from "./src/Containers/ListTab";

export const PokeTab = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Favourite" component={Favourite} />

      <Tab.Screen
        name="PokemonList"
        component={ListTab}
        options={{ headerShown: false }}
      />

      <Tab.Screen name="Map" component={PokeMap} />
    </Tab.Navigator>
  );
};
