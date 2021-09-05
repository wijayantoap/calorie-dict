import React, { useState } from "react";
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
  FlatList,
  Keyboard,
} from "react-native";
import SearchIcon from "../../assets/search.png";
import EdamamIcon from "../../assets/edamam.png";
import FoodPlaceholder from "../../assets/food-placeholder.jpg";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";

export default function HomeScreen({ navigation }) {
  const [text, onChangeText] = useState("Chicken");
  const [filter, setFilter] = useState("calories");

  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const win = Dimensions.get("window");

  const getFirstColor = (val) => {
    if (filter === val) {
      return "#26B96E";
    }
    if (filter === val) {
      return "#26B96E";
    }
    return "white";
  };

  const getSecondColor = (val) => {
    if (filter === val) {
      return "#68BD70";
    }
    if (filter === val) {
      return "#68BD70";
    }
    return "white";
  };

  const getHeadline = () => {
    if (filter === "calories") {
      return `Find Calories${"\n"}Within Your Food`;
    }
    if (filter === "recipes") {
      return `Look for Quick${"\n"}and Easy Recipes`;
    }
  };

  const handleSearch = () => {
    Keyboard.dismiss();
    setTimeout(function () {
      setLoading(true);
      setData([]);
    }, 100);

    fetch(
      `https://api.edamam.com/api/food-database/v2/parser?app_id=ce021308&app_key=0a52d0248fcf11662007595bbd7286ee&ingr=${text}`
    )
      .then((response) => response.json())
      .then((json) => {
        setData(json.hints);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Details")}>
        <View style={{ ...styles.imageContainer }}>
          <Image
            source={
              item.food.image
                ? {
                    uri: item.food.image,
                  }
                : FoodPlaceholder
            }
            style={{
              width: win.width - 68,
              height: 400,
              borderRadius: 12,
            }}
          />
          <Text style={styles.foodName}>{item.food.label}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headline}>{getHeadline()}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          onSubmitEditing={handleSearch}
        />
        <TouchableWithoutFeedback onPress={handleSearch}>
          <Image style={styles.searchLogo} source={SearchIcon} />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.filterContainer}>
        <LinearGradient
          colors={[getFirstColor("calories"), getSecondColor("calories")]}
          style={styles.filter}
          start={[0, 1]}
          end={[1, 0]}
        >
          <Text
            style={{ color: filter === "calories" ? "white" : "#CDCDCD" }}
            onPress={() => setFilter("calories")}
          >
            Calories
          </Text>
        </LinearGradient>
        <LinearGradient
          colors={[getFirstColor("recipes"), getSecondColor("recipes")]}
          style={styles.filter}
          start={[0, 1]}
          end={[1, 0]}
        >
          <Text
            style={{ color: filter === "recipes" ? "white" : "#CDCDCD" }}
            onPress={() => setFilter("recipes")}
          >
            Recipes
          </Text>
        </LinearGradient>
      </View>
      <Image
        source={EdamamIcon}
        resizeMode={"contain"}
        style={{
          width: win.width - 48,
          height: 40,
          borderRadius: 12,
          marginBottom: 8,
        }}
      />
      {isLoading && (
        <LottieView
          autoPlay
          loop
          source={require("../../assets/food-carousel.json")}
        />
      )}
      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={{ maxHeight: 410 }}
        persistentScrollbar={true}
      />
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
    marginBottom: 8,
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
    maxHeight: 400,
    marginRight: 12,
  },
  foodName: {
    position: "absolute",
    bottom: 24,
    left: 12,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    maxWidth: 200,
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
