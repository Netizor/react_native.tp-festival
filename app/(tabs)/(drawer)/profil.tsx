import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Switch } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { colors, fonts } from "../../../constants/design_constants";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

const Profile = () => {
  const router = useRouter();
  // Mock user data
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "06 12 34 56 78",
    notifications: true,
    newsletter: true
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...userData });

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...userData });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editedData.email)) {
      Alert.alert("Erreur", "Veuillez entrer une adresse email valide");
      return;
    }

    // Validate phone
    const phoneRegex = /^0[1-9]([ .-]?[0-9]{2}){4}$/;
    if (!phoneRegex.test(editedData.phone)) {
      Alert.alert("Erreur", "Veuillez entrer un numéro de téléphone valide");
      return;
    }

    setUserData({ ...editedData });
    setIsEditing(false);
    Alert.alert("Succès", "Vos informations ont été mises à jour");
  };

  const handleLogout = () => {
    Alert.alert(
      "Déconnexion",
      "Êtes-vous sûr de vouloir vous déconnecter ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Déconnexion", onPress: () => Alert.alert("Déconnecté", "Vous avez été déconnecté") }
      ]
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Mon profil</Text>
          {!isEditing && (
            <TouchableOpacity onPress={handleEdit}>
              <Feather name="edit" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {userData.name.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
            {isEditing && (
              <TouchableOpacity style={styles.editAvatarButton}>
                <Feather name="camera" size={16} color="white" />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.userName}>{userData.name}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Informations personnelles</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nom</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editedData.name}
                onChangeText={(text) => setEditedData({...editedData, name: text})}
              />
            ) : (
              <Text style={styles.infoValue}>{userData.name}</Text>
            )}
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editedData.email}
                onChangeText={(text) => setEditedData({...editedData, email: text})}
                keyboardType="email-address"
              />
            ) : (
              <Text style={styles.infoValue}>{userData.email}</Text>
            )}
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Téléphone</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editedData.phone}
                onChangeText={(text) => setEditedData({...editedData, phone: text})}
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.infoValue}>{userData.phone}</Text>
            )}
          </View>
        </View>

        <View style={styles.preferencesSection}>
          <Text style={styles.sectionTitle}>Préférences</Text>

          <View style={styles.preferenceRow}>
            <Text style={styles.preferenceLabel}>Notifications</Text>
            <Switch
              value={isEditing ? editedData.notifications : userData.notifications}
              onValueChange={(value) => 
                isEditing 
                  ? setEditedData({...editedData, notifications: value})
                  : setUserData({...userData, notifications: value})
              }
              trackColor={{ false: "#767577", true: colors.secondary }}
              thumbColor={isEditing ? "#f4f3f4" : "#f4f3f4"}
            />
          </View>

          <View style={styles.preferenceRow}>
            <Text style={styles.preferenceLabel}>Newsletter</Text>
            <Switch
              value={isEditing ? editedData.newsletter : userData.newsletter}
              onValueChange={(value) => 
                isEditing 
                  ? setEditedData({...editedData, newsletter: value})
                  : setUserData({...userData, newsletter: value})
              }
              trackColor={{ false: "#767577", true: colors.secondary }}
              thumbColor={isEditing ? "#f4f3f4" : "#f4f3f4"}
            />
          </View>
        </View>

        {isEditing ? (
          <View style={styles.editButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Enregistrer</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Feather name="log-out" size={20} color="white" style={styles.logoutIcon} />
            <Text style={styles.logoutText}>Déconnexion</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.quaternary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  profileSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 30,
    fontFamily: fonts.title,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.ternary,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontFamily: fonts.subtitle,
  },
  infoSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.subtitle,
    marginBottom: 15,
  },
  infoRow: {
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    fontFamily: fonts.body,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: fonts.body,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.quaternary,
    borderRadius: 5,
    padding: 10,
    fontFamily: fonts.body,
    fontSize: 16,
  },
  preferencesSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  preferenceLabel: {
    fontSize: 16,
    fontFamily: fonts.body,
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  cancelButton: {
    backgroundColor: colors.quaternary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontFamily: fonts.body,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontFamily: fonts.subtitle,
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: colors.ternary,
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutText: {
    color: 'white',
    fontFamily: fonts.subtitle,
    fontSize: 16,
  },
});
