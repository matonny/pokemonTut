import { Favourite } from "./src/Containers/FavouriteTab";
import { PokemonList } from "./src/Components/PokemonList";
import { PokeMap } from "./src/Containers/MapTab";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ListTab } from "./src/Containers/ListTab";
import Icon from "react-native-vector-icons/FontAwesome";

export const PokeTab = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Favourite"
        component={Favourite}
        options={{
          tabBarIcon: () => <Icon name={"star"} size={25} color={"grey"} />,
        }}
      />

      <Tab.Screen
        name="Pokemon List"
        component={ListTab}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name={"list"} size={25} color={"grey"} />,
        }}
      />

      <Tab.Screen
        name="Map"
        component={PokeMap}
        options={{
          tabBarIcon: () => <Icon name={"map-o"} size={25} color={"grey"} />,
        }}
      />
    </Tab.Navigator>
  );
};
