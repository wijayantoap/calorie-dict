import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  StatusBar,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
import SearchIcon from "../../assets/search.png";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen({ navigation }) {
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);
  const win = Dimensions.get("window");

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headline}>Find Calories{"\n"}Within Your Food</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <TouchableWithoutFeedback onPress={() => alert("a")}>
          <Image style={styles.searchLogo} source={SearchIcon} />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.filterContainer}>
        <LinearGradient
          colors={["#26B96E", "#68BD70"]}
          style={styles.filter}
          start={[0, 1]}
          end={[1, 0]}
        >
          <Text style={styles.filterText}>Calories</Text>
        </LinearGradient>
        <LinearGradient
          colors={["#26B96E", "#68BD70"]}
          style={styles.filter}
          start={[0, 1]}
          end={[1, 0]}
        >
          <Text style={styles.filterText}>Recipes</Text>
        </LinearGradient>
      </View>
      <View style={{ ...styles.imageContainer }}>
        <Image
          source={{
            uri: "https://www.edamam.com/web-img/e49/e493327cb8c40cbc25ebc6021f527fab.jpg",
          }}
          style={{ width: win.width - 48, height: 400, borderRadius: 12 }}
        />
        <Text style={styles.foodName}>Curried-Coconut Chicken Rendang</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 24,
    backgroundColor: "#F6F8FA",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  filterText: {
    color: "white",
  },
  input: {
    borderRadius: 20,
    marginRight: 12,
    padding: 20,
    backgroundColor: "white",
    flex: 1,
  },
  headline: {
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 24,
  },
  searchLogo: {
    width: 40,
    height: 40,
  },
  filter: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#1CBC66",
    marginRight: 12,
  },
  imageContainer: {
    position: "relative",
  },
  foodName: {
    position: "absolute",
    bottom: 24,
    left: 12,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    maxWidth: 200,
    // textShadowColor: "rgba(0, 0, 0, 0.75)",
    // textShadowOffset: { width: -1, height: 1 },
    // textShadowRadius: 10,
  },
});
