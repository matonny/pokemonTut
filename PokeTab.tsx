import { Favourite } from "./src/Containers/Favourite";
import { List } from "./src/Containers/List";
import { PokeMap } from "./src/Containers/PokeMap";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export const PokeTab = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Favourite" component={Favourite} />

      <Tab.Screen name="List" component={List} />

      <Tab.Screen name="Map" component={PokeMap} />
    </Tab.Navigator>
  );
};
