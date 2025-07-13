import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { colors, fonts } from "../../../constants/design_constants";
import { useRouter } from "expo-router";

// Mock data for cart items
const initialCartItems = [
  {
    id: 1,
    name: "Pass 1 jour",
    price: 45,
    quantity: 1,
  },
  {
    id: 2,
    name: "Pass 3 jours",
    price: 120,
    quantity: 1,
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const router = useRouter();

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const checkout = () => {
    Alert.alert(
      "Paiement",
      "Redirection vers la page de paiement...",
      [{ text: "OK" }]
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.navigate("./billets")}
            >
              <Feather name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>Mon panier</Text>
          </View>
        </View>

        {cartItems.length === 0 ? (
          <View style={styles.emptyCart}>
            <Feather name="shopping-cart" size={50} color={colors.secondary} />
            <Text style={styles.emptyCartText}>Votre panier est vide</Text>
            <TouchableOpacity 
              style={styles.continueButton}
              onPress={() => Alert.alert("Navigation", "Redirection vers la billetterie")}
            >
              <Text style={styles.continueButtonText}>Voir la billetterie</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.cartItems}>
              {cartItems.map(item => (
                <View key={item.id} style={styles.cartItem}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>{item.price} €</Text>
                  </View>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity 
                      onPress={() => updateQuantity(item.id, item.quantity - 1)}
                      style={styles.quantityButton}
                    >
                      <Feather name="minus" size={16} color={colors.secondary} />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity 
                      onPress={() => updateQuantity(item.id, item.quantity + 1)}
                      style={styles.quantityButton}
                    >
                      <Feather name="plus" size={16} color={colors.secondary} />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => removeItem(item.id)}>
                    <Feather name="trash-2" size={20} color={colors.ternary} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View style={styles.summary}>
              <Text style={styles.summaryTitle}>Récapitulatif</Text>
              <View style={styles.summaryRow}>
                <Text>Sous-total</Text>
                <Text>{getTotalPrice()} €</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text>Frais de service</Text>
                <Text>5 €</Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalPrice}>{getTotalPrice() + 5} €</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.checkoutButton} onPress={checkout}>
              <Text style={styles.checkoutButtonText}>Procéder au paiement</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.quaternary,
  },
  header: {
    padding: 20,
    backgroundColor: colors.secondary,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.subtitle,
    color: "white",
  },
  emptyCart: {
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
  emptyCartText: {
    fontSize: 18,
    fontFamily: fonts.body,
    marginTop: 20,
    marginBottom: 30,
  },
  continueButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  continueButtonText: {
    color: "white",
    fontFamily: fonts.body,
    fontSize: 16,
  },
  cartItems: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 5,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.quaternary,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontFamily: fonts.body,
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: colors.ternary,
    fontFamily: fonts.body,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.quaternary,
    alignItems: "center",
    justifyContent: "center",
  },
  quantity: {
    marginHorizontal: 10,
    fontFamily: fonts.body,
    fontSize: 16,
  },
  summary: {
    backgroundColor: "white",
    margin: 10,
    padding: 15,
    borderRadius: 5,
  },
  summaryTitle: {
    fontSize: 18,
    fontFamily: fonts.subtitle,
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.quaternary,
    paddingTop: 10,
    marginTop: 5,
  },
  totalText: {
    fontFamily: fonts.subtitle,
    fontSize: 16,
  },
  totalPrice: {
    fontFamily: fonts.subtitle,
    fontSize: 16,
    color: colors.ternary,
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    margin: 10,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 30,
  },
  checkoutButtonText: {
    color: "white",
    fontFamily: fonts.subtitle,
    fontSize: 16,
  },
});
