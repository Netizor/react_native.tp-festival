import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { colors, fonts } from "../../constants/design_constants";

const PlanInfoScreen = () => {
  const router = useRouter();

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Plan du festival</Text>
        </View>

        <View style={styles.content}>
          <Image
            source={require("../../assets/images/27839514-diaporama.png")}
            style={styles.mapImage}
            contentFit="contain"
          />

          <Text style={styles.sectionTitle}>Légende</Text>
          
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: colors.primary }]} />
            <Text style={styles.legendText}>Scènes principales</Text>
          </View>
          
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: colors.secondary }]} />
            <Text style={styles.legendText}>Scènes secondaires</Text>
          </View>
          
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: colors.ternary }]} />
            <Text style={styles.legendText}>Espaces restauration</Text>
          </View>
          
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: "green" }]} />
            <Text style={styles.legendText}>Toilettes</Text>
          </View>
          
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: "red" }]} />
            <Text style={styles.legendText}>Postes de secours</Text>
          </View>

          <Text style={styles.sectionTitle}>Scènes principales</Text>
          
          <View style={styles.stageItem}>
            <Text style={styles.stageName}>Scène Rock</Text>
            <Text style={styles.stageDescription}>
              Capacité: 10 000 personnes
              {"\n"}Horaires: 14h - 2h
              {"\n"}Artistes: Rock, Metal, Punk
            </Text>
          </View>
          
          <View style={styles.stageItem}>
            <Text style={styles.stageName}>Scène Électro</Text>
            <Text style={styles.stageDescription}>
              Capacité: 8 000 personnes
              {"\n"}Horaires: 16h - 4h
              {"\n"}Artistes: Électro, House, Techno
            </Text>
          </View>
          
          <View style={styles.stageItem}>
            <Text style={styles.stageName}>Scène Pop</Text>
            <Text style={styles.stageDescription}>
              Capacité: 12 000 personnes
              {"\n"}Horaires: 14h - 1h
              {"\n"}Artistes: Pop, Indie, Folk
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Informations pratiques</Text>
          
          <View style={styles.infoItem}>
            <Feather name="info" size={20} color={colors.primary} style={styles.infoIcon} />
            <Text style={styles.infoText}>
              Des points d'eau gratuits sont disponibles à côté de chaque scène.
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <Feather name="info" size={20} color={colors.primary} style={styles.infoIcon} />
            <Text style={styles.infoText}>
              Des casiers sécurisés sont disponibles à la location (5€/jour).
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <Feather name="info" size={20} color={colors.primary} style={styles.infoIcon} />
            <Text style={styles.infoText}>
              Le festival est accessible aux personnes à mobilité réduite.
            </Text>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default PlanInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.quaternary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.secondary,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.subtitle,
    color: "white",
  },
  content: {
    padding: 20,
  },
  mapImage: {
    width: Dimensions.get('window').width - 40,
    height: 300,
    marginBottom: 20,
    backgroundColor: colors.secondary,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: fonts.subtitle,
    marginTop: 20,
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  legendText: {
    fontFamily: fonts.body,
    fontSize: 16,
  },
  stageItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  stageName: {
    fontFamily: fonts.subtitle,
    fontSize: 18,
    marginBottom: 5,
  },
  stageDescription: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
  },
  infoItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  infoIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
  },
});