import { Image, Text, View } from "react-native";

interface PokemonSummaryProps {
  name: string;
  frontUrl: string;
}
export const PokemonSummaryView = ({ name, frontUrl }: PokemonSummaryProps) => {
  return (
    <View>
      <Text>{name}</Text>
      <Image source={{ width: 100, height: 100, uri: frontUrl }} />
    </View>
  );
};
