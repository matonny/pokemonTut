import { FavouriteTab } from "./src/Containers/FavouriteTab";
import { MapTab } from "./src/Containers/MapTab";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ListTab } from "./src/Containers/ListTab";
import Icon from "react-native-vector-icons/FontAwesome";

export const PokeTabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Favourite"
        component={FavouriteTab}
        options={{
          tabBarIcon: () => <Icon name={"star-o"} size={25} color={"grey"} />,
        }}
      />

      <Tab.Screen
        name="Pokemon List"
        component={ListTab}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name={"list-ul"} size={25} color={"grey"} />,
        }}
      />

      <Tab.Screen
        name="Map"
        component={MapTab}
        options={{
          tabBarIcon: () => <Icon name={"map-o"} size={25} color={"grey"} />,
        }}
      />
    </Tab.Navigator>
  );
};
