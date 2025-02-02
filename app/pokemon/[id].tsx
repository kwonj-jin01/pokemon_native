import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { Colors } from "@/constants/Colors";
import { useThemeColors } from "@/hooks/useThemeColors";
import { getPokemonArtwork } from "@/functions/pokemons";
import { Card } from "@/components/Card";

export default function Pokemon() {
  const colors = useThemeColors();
  const params = useLocalSearchParams() as { id: string };
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data: pokemon } = useFetchQuery("/pokemon/[id]", { id });
  const mainType = pokemon?.types?.[0]?.type?.name as keyof typeof Colors.type;
  const colorType = mainType ? Colors.type[mainType] : colors.tint;

  return (
    <RootView style={{ backgroundColor: colorType }}>
      <View>
        <Image style={styles.pokeball} source={require("@/assets/images/pokeball_big.png")}
          width={208}
          height={208} />
        <Row style={styles.header}>
          <Row gap={8}>
            <Pressable onPress={router.back}>
              <Image
                source={require("@/assets/images/back.png")}
                width={200}
                height={20}
              />
            </Pressable>
            <ThemedText color="grayWhite" variant="headline" style={{textTransform: "capitalize"}}>
              {pokemon?.name}
            </ThemedText>
          </Row>
          <View style={styles.body}>
            <Image style={styles.artwork}
              source={{
                uri: getPokemonArtwork(id)
              }}
              width={200}
              height={200}
            />
            <Card style={styles.card}>
              <ThemedText>Bonjour les gens</ThemedText>
            </Card>
          </View>
        </Row>

        <Text>Pokemon {params.id}</Text>
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({
  header: {
    margin: 20,
    justifyContent: "space-between",
  },
  pokeball: {
    position: 'absolute',
    opacity: 1,
    right: 8,
    top: 8,
  },
  artwork: {
    position: "absolute",
    top: -140,
    alignSelf: "center",
    zIndex: 2,
  },
  body: {
    marginTop: 144,
  },
  card: {
    paddingHorizontal: 20,
    paddingTop: 60
  }
});
