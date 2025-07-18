import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Collapsible from "react-native-collapsible";
import { fonts } from "../constants/design_constants";

const backgroundImage = require("../assets/images/prog-globale-web-fond-03-scaled.jpg");

const Menu = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (key: string) => {
    setActiveSection(activeSection === key ? null : key);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={backgroundImage}
          style={styles.poster}
          resizeMode="cover"
          imageStyle={{ opacity: 0.7 }}
        >
          <View style={styles.textOverlay}>
            <Text style={styles.overlayText}>Comment venir ?</Text>
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <View style={styles.containerSection}>
            <View style={styles.menuList}>
              {[
                {
                  title: "A pied",
                  key: "a_pied",
                  content:
                    "Le centre-ville est entièrement accessible à pied. Prévoyez de bonnes chaussures ! Le site du festival se trouve à 15 minutes à pied de la gare d'Albi.",
                },
                {
                  title: "A vélo ou à moto",
                  key: "velo_moto",
                  content:
                    "Des parkings à vélos et motos sont disponibles à l'entrée du festival. Des stations de vélos en libre-service sont également disponibles à proximité.",
                },
                {
                  title: "En voiture",
                  key: "voiture",
                  content:
                    "Plusieurs parkings sont disponibles autour du site du festival. Nous vous recommandons d'utiliser le parking P1 (5€/jour) ou le parking P2 (gratuit avec navette). Coordonnées GPS : 43.929, 2.146",
                },
                {
                  title: "En transports en commun",
                  key: "transports",
                  content:
                    "Des navettes gratuites sont mises en place depuis la gare d'Albi et le centre-ville. Fréquence : toutes les 15 minutes de 10h à 2h du matin. Les bus de la ligne 3 desservent également le site du festival (arrêt 'Festival').",
                },
                {
                  title: "En train",
                  key: "train",
                  content:
                    "La gare SNCF d'Albi-Ville est desservie par des trains directs depuis Toulouse, Rodez et Carmaux. Des navettes gratuites sont disponibles entre la gare et le site du festival.",
                },
                {
                  title: "En avion",
                  key: "avion",
                  content:
                    "L'aéroport le plus proche est l'aéroport de Toulouse-Blagnac (80 km). Des navettes sont disponibles entre l'aéroport et la gare de Toulouse, puis prenez un train pour Albi.",
                },
                {
                  title: "Covoiturage",
                  key: "covoiturage",
                  content:
                    "Nous encourageons le covoiturage ! Rendez-vous sur notre plateforme partenaire pour trouver ou proposer un trajet. Les véhicules avec 3 passagers ou plus bénéficient d'un tarif réduit sur le parking P1.",
                },
              ].map((item, index) => {
                const isActive = activeSection === item.key;
                return (
                  <View key={index} style={styles.accordionSection}>
                    <TouchableOpacity onPress={() => toggleSection(item.key)}>
                      <View style={styles.item}>
                        <Text style={styles.itemText}>{item.title}</Text>
                        <Feather
                          size={20}
                          name={isActive ? "chevron-up" : "chevron-down"}
                        />
                      </View>
                    </TouchableOpacity>
                    <Collapsible collapsed={!isActive}>
                      <View style={styles.collapsibleContent}>
                        <Text style={styles.collapsibleText}>
                          {item.content}
                        </Text>
                      </View>
                    </Collapsible>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  poster: {
    height: Dimensions.get("window").height * 0.5, // 50% hauteur écran
    justifyContent: "flex-end",
    padding: 15,
    backgroundColor: "#F2C94C", // fallback
  },
  textOverlay: {
    position: "absolute",
    left: 15,
    bottom: 15,
  },
  overlayText: {
    fontFamily: fonts.subtitle,
    fontSize: 42,
    color: "white",
  },
  content: {
    width: Dimensions.get("screen").width,
    padding: 20,
    gap: 20,
  },
  containerSection: {
    gap: 10,
  },
  menuList: {
    width: "100%",
    backgroundColor: "#D9D9D9",
  },
  accordionSection: {
    borderBottomColor: "#C0C0C0",
    borderBottomWidth: 1,
  },
  item: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: {
    fontSize: 22,
    fontFamily: fonts.subtitle,
  },
  collapsibleContent: {
    paddingHorizontal: 10,
    paddingBottom: 15,
    backgroundColor: "#D9D9D9",
  },
  collapsibleText: {
    fontSize: 16,
    fontFamily: fonts.body,
  },
});
