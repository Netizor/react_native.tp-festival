import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Linking, Alert } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { colors, fonts } from "../../constants/design_constants";

const VictimeTemoinScreen = () => {
  const router = useRouter();

  const handleEmergencyCall = () => {
    Alert.alert(
      "Appel d'urgence",
      "Voulez-vous appeler le numéro d'urgence ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Appeler", onPress: () => Linking.openURL("tel:112") }
      ]
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Victime ou témoin ?</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.emergencyBox}>
            <Text style={styles.emergencyTitle}>En cas d'urgence</Text>
            <TouchableOpacity 
              style={styles.emergencyButton}
              onPress={handleEmergencyCall}
            >
              <Feather name="phone-call" size={24} color="white" style={styles.emergencyIcon} />
              <Text style={styles.emergencyButtonText}>Appeler les secours</Text>
            </TouchableOpacity>
            <Text style={styles.emergencyInfo}>
              En cas d'urgence, contactez immédiatement le personnel de sécurité le plus proche ou appelez le 112.
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Points de secours</Text>
          <Text style={styles.sectionText}>
            Des points de secours sont disponibles à plusieurs endroits sur le site du festival :
          </Text>
          
          <View style={styles.infoItem}>
            <Feather name="map-pin" size={20} color={colors.primary} style={styles.infoIcon} />
            <View>
              <Text style={styles.infoTitle}>Point de secours principal</Text>
              <Text style={styles.infoText}>Situé à côté de l'entrée principale</Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <Feather name="map-pin" size={20} color={colors.primary} style={styles.infoIcon} />
            <View>
              <Text style={styles.infoTitle}>Point de secours scène Rock</Text>
              <Text style={styles.infoText}>À droite de la scène</Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <Feather name="map-pin" size={20} color={colors.primary} style={styles.infoIcon} />
            <View>
              <Text style={styles.infoTitle}>Point de secours scène Électro</Text>
              <Text style={styles.infoText}>À gauche de la scène</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Témoin d'un incident</Text>
          <Text style={styles.sectionText}>
            Si vous êtes témoin d'un incident :
          </Text>
          
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepText}>
              Restez calme et évaluez la situation
            </Text>
          </View>
          
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepText}>
              Alertez le personnel de sécurité le plus proche
            </Text>
          </View>
          
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepText}>
              Si nécessaire, appelez les secours au 112
            </Text>
          </View>
          
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <Text style={styles.stepText}>
              Restez auprès de la victime jusqu'à l'arrivée des secours
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Prévention</Text>
          
          <View style={styles.preventionItem}>
            <Feather name="droplet" size={24} color={colors.primary} style={styles.preventionIcon} />
            <View>
              <Text style={styles.preventionTitle}>Hydratation</Text>
              <Text style={styles.preventionText}>
                Buvez régulièrement de l'eau, surtout par temps chaud
              </Text>
            </View>
          </View>
          
          <View style={styles.preventionItem}>
            <Feather name="sun" size={24} color={colors.primary} style={styles.preventionIcon} />
            <View>
              <Text style={styles.preventionTitle}>Protection solaire</Text>
              <Text style={styles.preventionText}>
                Portez un chapeau et appliquez de la crème solaire
              </Text>
            </View>
          </View>
          
          <View style={styles.preventionItem}>
            <Feather name="volume-2" size={24} color={colors.primary} style={styles.preventionIcon} />
            <View>
              <Text style={styles.preventionTitle}>Protection auditive</Text>
              <Text style={styles.preventionText}>
                Utilisez des bouchons d'oreilles près des scènes
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default VictimeTemoinScreen;

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
  emergencyBox: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'red',
  },
  emergencyTitle: {
    fontSize: 20,
    fontFamily: fonts.subtitle,
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  emergencyButton: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  emergencyIcon: {
    marginRight: 10,
  },
  emergencyButtonText: {
    color: 'white',
    fontFamily: fonts.subtitle,
    fontSize: 16,
  },
  emergencyInfo: {
    fontFamily: fonts.body,
    fontSize: 14,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: fonts.subtitle,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionText: {
    fontFamily: fonts.body,
    fontSize: 16,
    marginBottom: 15,
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
  infoTitle: {
    fontFamily: fonts.subtitle,
    fontSize: 16,
    marginBottom: 5,
  },
  infoText: {
    fontFamily: fonts.body,
    fontSize: 14,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepNumberText: {
    color: 'white',
    fontFamily: fonts.subtitle,
    fontSize: 16,
  },
  stepText: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 16,
  },
  preventionItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  preventionIcon: {
    marginRight: 15,
    marginTop: 2,
  },
  preventionTitle: {
    fontFamily: fonts.subtitle,
    fontSize: 16,
    marginBottom: 5,
  },
  preventionText: {
    fontFamily: fonts.body,
    fontSize: 14,
  },
});