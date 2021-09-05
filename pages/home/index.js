import React, { useEffect, useState } from "react";
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
  const [text, onChangeText] = useState("");
  const [filter, setFilter] = useState("calories");
  const [placeholder, setPlaceholder] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [isEmpty, setEmpty] = useState(false);
  const [data, setData] = useState([]);

  const win = Dimensions.get("window");

  useEffect(() => {
    setData([]);
    setPlaceholder(getPlaceholder());
  }, [filter]);

  const getPlaceholder = () => {
    const num = Math.floor(Math.random() * 10 + 1);
    if (num < 2) {
      return "Try chicken for today?";
    }
    if (num >= 2 && num < 4) {
      return "What about beef..";
    }
    if (num >= 4 && num < 7) {
      return "Hungry for spaghetti?";
    }
    if (num >= 7) {
      return "Pizza sounds great!";
    }
  };

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
      return `Find calories${"\n"}in your food`;
    }
    if (filter === "recipes") {
      return `Quick and eaasy${"\n"}recipes in your hand`;
    }
  };

  const handleSearch = () => {
    if (!text) {
      setPlaceholder("Hey! Fill me up first..");
      return;
    }
    Keyboard.dismiss();
    setTimeout(function () {
      setLoading(true);
      setData([]);
      setEmpty(false);
      setError(false);
    }, 100);

    if (filter === "calories") {
      fetch(
        `https://api.edamam.com/api/food-database/v2/parser?app_id=ce021308&app_key=0a52d0248fcf11662007595bbd7286ee&ingr=${text}`
      )
        .then((response) => response.json())
        .then((json) => {
          setData(json.hints);
          if (json.hints.length === 0) {
            setEmpty(true);
          }
        })
        .catch((error) => {
          setError(true);
          console.log(error);
        })
        .finally(() => setLoading(false));
    }
    if (filter === "recipes") {
      fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&app_id=5851fcb8&app_key=bbb065b226f55bbe361ce6cfec92dd57&q=${text}`
      )
        .then((response) => response.json())
        .then((json) => {
          setData(json.hits);
          if (json.hits.length === 0) {
            setEmpty(true);
          }
        })
        .catch((error) => {
          setError(true);
          console.log(error);
        })
        .finally(() => setLoading(false));
    }
  };

  const renderItem = ({ item }) => {
    if (filter === "calories") {
      if (!item.food) {
        return null;
      }
      return (
        <TouchableWithoutFeedback
          onPress={() => alert("Details only available for recipes")}
        >
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
            <View style={styles.textFoodContainer}>
              <Text style={styles.foodName}>{item.food.label}</Text>
              <Text style={styles.foodDetails}>
                {Math.round(item.food.nutrients.ENERC_KCAL)} kcal I{" "}
                {Math.round(item.food.nutrients.PROCNT)} g protein I{"\n"}
                {Math.round(item.food.nutrients.FAT)} g fat @ 100 g
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    }
    if (filter === "recipes") {
      if (!item.recipe) {
        return null;
      }
      return (
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Details", item)}
        >
          <View style={{ ...styles.imageContainer }}>
            <Image
              source={
                item.recipe.image
                  ? {
                      uri: item.recipe.image,
                    }
                  : FoodPlaceholder
              }
              style={{
                width: win.width - 68,
                height: 400,
                borderRadius: 12,
              }}
            />
            <View style={styles.textFoodContainer}>
              <Text style={styles.foodName}>{item.recipe.label}</Text>
              <Text style={styles.foodDetails}>
                {Math.round(item.recipe.calories)} kcal I{" "}
                {Math.round(item.recipe.totalNutrients.PROCNT.quantity)} g
                protein I{"\n"}{" "}
                {Math.round(item.recipe.totalNutrients.FAT.quantity)} g fat @{" "}
                {Math.round(item.recipe.yield)} servings
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    }
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
          placeholder={placeholder}
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
      {isEmpty && (
        <View
          style={{
            alignSelf: "center",
          }}
        >
          <LottieView
            autoPlay
            loop
            source={require("../../assets/empty.json")}
            style={{
              height: 200,
            }}
          />
          <Text style={{ textAlign: "center", marginTop: 8 }}>
            No result found,{"\n"}try something else
          </Text>
        </View>
      )}
      {isError && (
        <View
          style={{
            alignSelf: "center",
          }}
        >
          <LottieView
            autoPlay
            loop
            source={require("../../assets/error.json")}
            style={{
              height: 200,
            }}
          />
          <Text style={{ textAlign: "center", marginTop: 8 }}>
            Something went wrong,{"\n"}try again later
          </Text>
        </View>
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
  textFoodContainer: {
    position: "absolute",
    bottom: 24,
    left: 12,
  },
  foodName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    maxWidth: 200,
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  foodDetails: {
    fontSize: 14,
    color: "white",
    maxWidth: 200,
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
