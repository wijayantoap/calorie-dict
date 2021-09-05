import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import FoodPlaceholder from "../../assets/food-placeholder.jpg";
import { AdMobBanner } from "expo-ads-admob";

export default function DetailsScreen({ navigation, route }) {
  const [showNutritions, setShowNutritions] = useState(true);
  const [showCautions, setShowCautions] = useState(true);
  const [showIngredients, setShowIngredients] = useState(true);

  const win = Dimensions.get("window");

  const renderItem = () => {
    if (route.params.recipe) {
      const item = route.params.recipe;
      return (
        <View style={{ ...styles.itemContainer }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{ ...styles.headline, color: "#ABAAAA" }}
              onPress={() => navigation.pop()}
            >
              {String.fromCharCode(8592)}
            </Text>
            <Text style={{ ...styles.headline, flex: 1, marginRight: 24 }}>
              {item?.label}
            </Text>
          </View>
          <Image
            source={
              item.image
                ? {
                    uri: item.image,
                  }
                : FoodPlaceholder
            }
            style={{
              width: win.width - 68,
              height: 300,
              borderRadius: 12,
              marginBottom: 20,
            }}
          />
          <AdMobBanner
            bannerSize="largeBanner"
            adUnitID="ca-app-pub-1112252263707173/4310853595" // Test ID, Replace with your-admob-unit-id
            servePersonalizedAds
            style={{ alignSelf: "center", marginBottom: 20 }}
          />
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  backgroundColor: "#68BD70",
                  padding: 16,
                  paddingHorizontal: 40,
                  color: "white",
                  borderTopLeftRadius: 12,
                  borderBottomLeftRadius: 12,
                }}
              >
                {Math.round(item.yield)}
              </Text>
              <Text
                style={{
                  backgroundColor: "#a7d9ad",
                  padding: 16,
                  color: "white",
                  borderTopRightRadius: 12,
                  borderBottomRightRadius: 12,
                  flex: 1,
                  textAlign: "center",
                }}
              >
                Servings ({Math.round(item.calories)} kcal)
              </Text>
            </View>
            <View>
              <Text
                style={styles.headerTitle}
                onPress={() => setShowNutritions(!showNutritions)}
              >
                {String.fromCharCode(9878)} Nutritions{" "}
                {showNutritions
                  ? String.fromCharCode(8613)
                  : String.fromCharCode(8628)}
              </Text>
              {showNutritions && (
                <View>
                  <View style={styles.nutritionContainer}>
                    {renderNutrition(
                      item.totalNutrients?.CA?.label,
                      item.totalNutrients?.CA?.quantity,
                      item.totalNutrients?.CA?.unit
                    )}
                    {renderNutrition(
                      item.totalNutrients?.CHOCDF?.label,
                      item.totalNutrients?.CHOCDF?.quantity,
                      item.totalNutrients?.CHOCDF?.unit
                    )}
                  </View>
                  <View style={styles.nutritionContainer}>
                    {renderNutrition(
                      item.totalNutrients?.CHOLE?.label,
                      item.totalNutrients?.CHOLE?.quantity,
                      item.totalNutrients?.CHOLE?.unit
                    )}
                    {renderNutrition(
                      item.totalNutrients?.ENERC_KCAL?.label,
                      item.totalNutrients?.ENERC_KCAL?.quantity,
                      item.totalNutrients?.ENERC_KCAL?.unit
                    )}
                  </View>
                  <View style={styles.nutritionContainer}>
                    {renderNutrition(
                      item.totalNutrients?.FAMS?.label,
                      item.totalNutrients?.FAMS?.quantity,
                      item.totalNutrients?.FAMS?.unit
                    )}
                    {renderNutrition(
                      item.totalNutrients?.FAPU?.label,
                      item.totalNutrients?.FAPU?.quantity,
                      item.totalNutrients?.FAPU?.unit
                    )}
                  </View>
                  <View style={styles.nutritionContainer}>
                    {renderNutrition(
                      item.totalNutrients?.FASAT?.label,
                      item.totalNutrients?.FASAT?.quantity,
                      item.totalNutrients?.FASAT?.unit
                    )}
                    {renderNutrition(
                      item.totalNutrients?.FAT?.label,
                      item.totalNutrients?.FAT?.quantity,
                      item.totalNutrients?.FAT?.unit
                    )}
                  </View>
                  <View style={styles.nutritionContainer}>
                    {renderNutrition(
                      item.totalNutrients?.FATRN?.label,
                      item.totalNutrients?.FATRN?.quantity,
                      item.totalNutrients?.FATRN?.unit
                    )}
                    {renderNutrition(
                      item.totalNutrients?.FE?.label,
                      item.totalNutrients?.FE?.quantity,
                      item.totalNutrients?.FE?.unit
                    )}
                  </View>
                  <View style={styles.nutritionContainer}>
                    {renderNutrition(
                      item.totalNutrients?.FIBTG?.label,
                      item.totalNutrients?.FIBTG?.quantity,
                      item.totalNutrients?.FIBTG?.unit
                    )}
                    {renderNutrition(
                      item.totalNutrients?.FOLAC?.label,
                      item.totalNutrients?.FOLAC?.quantity,
                      item.totalNutrients?.FOLAC?.unit
                    )}
                  </View>
                  <View style={styles.nutritionContainer}>
                    {renderNutrition(
                      item.totalNutrients?.FOLDFE?.label,
                      item.totalNutrients?.FOLDFE?.quantity,
                      item.totalNutrients?.FOLDFE?.unit
                    )}
                    {renderNutrition(
                      item.totalNutrients?.FOLFD?.label,
                      item.totalNutrients?.FOLFD?.quantity,
                      item.totalNutrients?.FOLFD?.unit
                    )}
                  </View>
                  <View style={styles.nutritionContainer}>
                    {renderNutrition(
                      item.totalNutrients?.K?.label,
                      item.totalNutrients?.K?.quantity,
                      item.totalNutrients?.K?.unit
                    )}
                    {renderNutrition(
                      item.totalNutrients?.MG?.label,
                      item.totalNutrients?.MG?.quantity,
                      item.totalNutrients?.MG?.unit
                    )}
                  </View>
                  <View style={styles.nutritionContainer}>
                    {renderNutrition(
                      item.totalNutrients?.NA?.label,
                      item.totalNutrients?.NA?.quantity,
                      item.totalNutrients?.NA?.unit
                    )}
                    {renderNutrition(
                      item.totalNutrients?.NIA?.label,
                      item.totalNutrients?.NIA?.quantity,
                      item.totalNutrients?.NIA?.unit
                    )}
                  </View>
                  <View style={styles.nutritionContainer}>
                    {renderNutrition(
                      item.totalNutrients?.P?.label,
                      item.totalNutrients?.P?.quantity,
                      item.totalNutrients?.P?.unit
                    )}
                    {renderNutrition(
                      item.totalNutrients?.PROCNT?.label,
                      item.totalNutrients?.PROCNT?.quantity,
                      item.totalNutrients?.PROCNT?.unit
                    )}
                  </View>
                  <View style={styles.nutritionContainer}>
                    {renderNutrition(
                      item.totalNutrients?.RIBF?.label,
                      item.totalNutrients?.RIBF?.quantity,
                      item.totalNutrients?.RIBF?.unit
                    )}
                    {renderNutrition(
                      item.totalNutrients?.SUGAR?.label,
                      item.totalNutrients?.SUGAR?.quantity,
                      item.totalNutrients?.SUGAR?.unit
                    )}
                  </View>
                  <View style={styles.nutritionContainer}>
                    {renderNutrition(
                      item.totalNutrients?.THIA?.label,
                      item.totalNutrients?.THIA?.quantity,
                      item.totalNutrients?.THIA?.unit
                    )}
                    {renderNutrition(
                      item.totalNutrients?.TOCPHA?.label,
                      item.totalNutrients?.TOCPHA?.quantity,
                      item.totalNutrients?.TOCPHA?.unit
                    )}
                  </View>
                  <View style={styles.nutritionContainer}>
                    {renderNutrition(
                      item.totalNutrients?.VITA_RAE?.label,
                      item.totalNutrients?.VITA_RAE?.quantity,
                      item.totalNutrients?.VITA_RAE?.unit
                    )}
                    {renderNutrition(
                      item.totalNutrients?.VITB6A?.label,
                      item.totalNutrients?.VITB6A?.quantity,
                      item.totalNutrients?.VITB6A?.unit
                    )}
                  </View>
                  <View style={styles.nutritionContainer}>
                    {renderNutrition(
                      item.totalNutrients?.VITB12?.label,
                      item.totalNutrients?.VITB12?.quantity,
                      item.totalNutrients?.VITB12?.unit
                    )}
                    {renderNutrition(
                      item.totalNutrients?.VITC?.label,
                      item.totalNutrients?.VITC?.quantity,
                      item.totalNutrients?.VITC?.unit
                    )}
                  </View>
                  <View style={styles.nutritionContainer}>
                    {renderNutrition(
                      item.totalNutrients?.VITD?.label,
                      item.totalNutrients?.VITD?.quantity,
                      item.totalNutrients?.VITD?.unit
                    )}
                    {renderNutrition(
                      item.totalNutrients?.VITK1?.label,
                      item.totalNutrients?.VITK1?.quantity,
                      item.totalNutrients?.VITK1?.unit
                    )}
                  </View>
                  <View style={styles.nutritionContainer}>
                    {renderNutrition(
                      item.totalNutrients?.WATER?.label,
                      item.totalNutrients?.WATER?.quantity,
                      item.totalNutrients?.WATER?.unit
                    )}
                    {renderNutrition(
                      item.totalNutrients?.ZN?.label,
                      item.totalNutrients?.ZN?.quantity,
                      item.totalNutrients?.ZN?.unit
                    )}
                  </View>
                </View>
              )}
            </View>
            <View>
              <Text
                style={styles.headerTitle}
                onPress={() => setShowCautions(!showCautions)}
              >
                {String.fromCharCode(9757)} Cautions{" "}
                {showCautions
                  ? String.fromCharCode(8613)
                  : String.fromCharCode(8628)}
              </Text>
              {showCautions &&
                item.cautions.map((val, index) => (
                  <Text
                    key={index}
                    style={{
                      backgroundColor: "#f57242",
                      padding: 8,
                      color: "white",
                      marginLeft: 24,
                      marginBottom: 8,
                    }}
                  >
                    {val}
                  </Text>
                ))}
            </View>
            <View>
              <Text
                style={styles.headerTitle}
                onPress={() => setShowIngredients(!showIngredients)}
              >
                {String.fromCharCode(9982)} Ingredients{" "}
                {showIngredients
                  ? String.fromCharCode(8613)
                  : String.fromCharCode(8628)}
              </Text>
              {showIngredients &&
                item.ingredients.map((item, index) =>
                  renderIngredients(item, index)
                )}
            </View>
            <AdMobBanner
              bannerSize="mediumRectangle"
              adUnitID="ca-app-pub-1112252263707173/1259531880"
              servePersonalizedAds
              style={{ alignSelf: "center", marginBottom: 20 }}
            />
          </View>
        </View>
      );
    }
  };

  const renderNutrition = (label, quantity, unit) => {
    if (!label) {
      return null;
    }
    return (
      <View
        style={{
          backgroundColor: "white",
          padding: 8,
          borderRadius: 12,
          flexDirection: "row",
          marginBottom: 8,
          flex: 1,
          marginRight: 4,
        }}
      >
        <Text
          style={{
            padding: 12,
            backgroundColor: "#F2F2F2",
            borderRadius: 30,
            marginRight: 8,
            maxHeight: 48,
            minWidth: 48,
            textAlign: "center",
          }}
        >
          {Math.round(quantity)}
        </Text>
        <View>
          <Text style={{ fontWeight: "bold", maxWidth: 90 }}>{label}</Text>
          <Text>{unit}</Text>
        </View>
      </View>
    );
  };

  const renderIngredients = (item, index) => {
    return (
      <View
        key={index}
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          marginBottom: 12,
          padding: 12,
          borderRadius: 12,
        }}
      >
        <Image
          source={
            item.image
              ? {
                  uri: item.image,
                }
              : FoodPlaceholder
          }
          style={{ width: 60, height: 60, borderRadius: 12 }}
        />
        <Text
          style={{
            color: "black",
            maxWidth: 280,
            marginHorizontal: 12,
          }}
        >
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderItem()}
      </ScrollView>
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
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 24,
  },
  filter: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#1CBC66",
    marginRight: 12,
  },
  itemContainer: {
    // position: "relative",
    // maxHeight: 400,
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
  nutritionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    color: "#82b088",
    fontWeight: "bold",
    marginBottom: 8,
  },
});
