import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, Dimensions } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { colors, fonts } from "../../../constants/design_constants";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

// Mock data for tickets
const ticketsData = [
  {
    id: 1,
    name: "Pass 1 jour - Vendredi",
    price: 45,
    description: "Accès à tous les concerts du vendredi",
    image: require("../../../assets/images/27839514-diaporama.png"),
  },
  {
    id: 2,
    name: "Pass 1 jour - Samedi",
    price: 45,
    description: "Accès à tous les concerts du samedi",
    image: require("../../../assets/images/27839514-diaporama.png"),
  },
  {
    id: 3,
    name: "Pass 1 jour - Dimanche",
    price: 45,
    description: "Accès à tous les concerts du dimanche",
    image: require("../../../assets/images/27839514-diaporama.png"),
  },
  {
    id: 4,
    name: "Pass 3 jours",
    price: 120,
    description: "Accès à tous les concerts pendant les 3 jours du festival",
    image: require("../../../assets/images/27839514-diaporama.png"),
  },
  {
    id: 5,
    name: "Pass VIP",
    price: 200,
    description: "Accès VIP à tous les concerts, accès aux coulisses et rencontres avec les artistes",
    image: require("../../../assets/images/27839514-diaporama.png"),
  }
];

const BilletScreen = (): React.JSX.Element => {
  const [cart, setCart] = useState<number[]>([]);
  const router = useRouter();

  const addToCart = (ticketId: number) => {
    setCart([...cart, ticketId]);
    Alert.alert(
      "Ajouté au panier",
      "Le billet a été ajouté à votre panier",
      [
        { text: "Continuer mes achats" },
        { 
          text: "Voir mon panier", 
          onPress: () => router.navigate("./cart")
        }
      ]
    );
  };

  const isInCart = (ticketId: number) => {
    return cart.includes(ticketId);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Billetterie</Text>
        </View>

        <View style={styles.infoBox}>
          <Feather name="info" size={20} color={colors.secondary} style={styles.infoIcon} />
          <Text style={styles.infoText}>
            Les billets sont disponibles en quantité limitée. Réservez dès maintenant pour garantir votre place !
          </Text>
        </View>

        <View style={styles.ticketsContainer}>
          {ticketsData.map((ticket) => (
            <View key={ticket.id} style={styles.ticketCard}>
              <Image source={ticket.image} style={styles.ticketImage} />
              <View style={styles.ticketContent}>
                <Text style={styles.ticketName}>{ticket.name}</Text>
                <Text style={styles.ticketPrice}>{ticket.price} €</Text>
                <Text style={styles.ticketDescription}>{ticket.description}</Text>
                <TouchableOpacity 
                  style={[
                    styles.addButton, 
                    isInCart(ticket.id) ? styles.addedButton : {}
                  ]}
                  onPress={() => addToCart(ticket.id)}
                  disabled={isInCart(ticket.id)}
                >
                  <Text style={styles.addButtonText}>
                    {isInCart(ticket.id) ? "Ajouté au panier" : "Ajouter au panier"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {cart.length > 0 && (
          <TouchableOpacity 
            style={styles.viewCartButton}
            onPress={() => router.navigate("./cart")}
          >
            <Feather name="shopping-cart" size={20} color="white" style={styles.cartIcon} />
            <Text style={styles.viewCartText}>
              Voir mon panier ({cart.length})
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.infoSection}>
          <Text style={styles.infoSectionTitle}>Informations importantes</Text>
          <View style={styles.infoItem}>
            <Feather name="calendar" size={20} color={colors.primary} style={styles.infoItemIcon} />
            <View>
              <Text style={styles.infoItemTitle}>Dates du festival</Text>
              <Text style={styles.infoItemText}>Du 15 au 17 juillet 2025</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <Feather name="map-pin" size={20} color={colors.primary} style={styles.infoItemIcon} />
            <View>
              <Text style={styles.infoItemTitle}>Lieu</Text>
              <Text style={styles.infoItemText}>Parc des expositions, Albi</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <Feather name="clock" size={20} color={colors.primary} style={styles.infoItemIcon} />
            <View>
              <Text style={styles.infoItemTitle}>Horaires</Text>
              <Text style={styles.infoItemText}>Ouverture des portes à 14h</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default BilletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.quaternary,
  },
  header: {
    padding: 20,
    backgroundColor: colors.secondary,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.subtitle,
    color: "white",
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "rgba(80, 147, 255, 0.1)",
    padding: 15,
    margin: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  infoIcon: {
    marginRight: 10,
  },
  infoText: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 14,
  },
  ticketsContainer: {
    padding: 10,
  },
  ticketCard: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
  },
  ticketImage: {
    width: "100%",
    height: 120,
    backgroundColor: colors.secondary,
  },
  ticketContent: {
    padding: 15,
  },
  ticketName: {
    fontSize: 18,
    fontFamily: fonts.subtitle,
    marginBottom: 5,
  },
  ticketPrice: {
    fontSize: 20,
    fontFamily: fonts.title,
    color: colors.ternary,
    marginBottom: 10,
  },
  ticketDescription: {
    fontSize: 14,
    fontFamily: fonts.body,
    color: "#666",
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  addedButton: {
    backgroundColor: colors.quaternary,
  },
  addButtonText: {
    color: "white",
    fontFamily: fonts.body,
    fontSize: 14,
  },
  viewCartButton: {
    flexDirection: "row",
    backgroundColor: colors.secondary,
    margin: 10,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  cartIcon: {
    marginRight: 10,
  },
  viewCartText: {
    color: "white",
    fontFamily: fonts.subtitle,
    fontSize: 16,
  },
  infoSection: {
    backgroundColor: "white",
    margin: 10,
    padding: 15,
    borderRadius: 5,
    marginBottom: 30,
  },
  infoSectionTitle: {
    fontSize: 18,
    fontFamily: fonts.subtitle,
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
  },
  infoItemIcon: {
    marginRight: 15,
  },
  infoItemTitle: {
    fontSize: 16,
    fontFamily: fonts.body,
    fontWeight: "bold",
  },
  infoItemText: {
    fontSize: 14,
    fontFamily: fonts.body,
    color: "#666",
  },
  iconContainer: {
    flexDirection: "row",
    marginRight: 10,
  },
  icon: {
    marginHorizontal: 8,
  },
});
