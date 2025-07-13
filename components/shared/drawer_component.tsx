import { Feather } from "@expo/vector-icons";
import {
	type DrawerContentComponentProps,
	DrawerContentScrollView,
	DrawerItem,
} from "@react-navigation/drawer";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colors, fonts } from "../../constants/design_constants";

const DrawerComponent = (
	props: DrawerContentComponentProps,
): React.JSX.Element => {
	const router = useRouter();

	return (
		<DrawerContentScrollView {...props} style={styles.container}>
			<View style={styles.header}>
				<Image
					source={require("../../assets/images/27839514-diaporama.png")}
					style={styles.logo}
				/>
				<Text style={styles.festivalName}>Festival 2025</Text>
			</View>

			<View style={styles.drawerContent}>
				<View style={styles.drawerSection}>
					<Text style={styles.sectionTitle}>Billetterie</Text>
					<DrawerItem
						icon={({ color, size }) => (
							<Feather name="ticket" color={colors.primary} size={size} />
						)}
						label="Acheter des billets"
						labelStyle={styles.drawerItemLabel}
						onPress={() => router.navigate("/billets")}
					/>
					<DrawerItem
						icon={({ color, size }) => (
							<Feather name="shopping-cart" color={colors.primary} size={size} />
						)}
						label="Mon panier"
						labelStyle={styles.drawerItemLabel}
						onPress={() => router.navigate("/cart")}
					/>
				</View>

				<View style={styles.separator} />

				<View style={styles.drawerSection}>
					<Text style={styles.sectionTitle}>Mon compte</Text>
					<DrawerItem
						icon={({ color, size }) => (
							<Feather name="user" color={colors.primary} size={size} />
						)}
						label="Mon profil"
						labelStyle={styles.drawerItemLabel}
						onPress={() => router.navigate("/profil")}
					/>
					<DrawerItem
						icon={({ color, size }) => (
							<Feather name="heart" color={colors.primary} size={size} />
						)}
						label="Mes favoris"
						labelStyle={styles.drawerItemLabel}
						onPress={() => router.navigate("/")}
					/>
				</View>

				<View style={styles.separator} />

				<View style={styles.drawerSection}>
					<Text style={styles.sectionTitle}>Festival</Text>
					<DrawerItem
						icon={({ color, size }) => (
							<Feather name="home" color={colors.primary} size={size} />
						)}
						label="Accueil"
						labelStyle={styles.drawerItemLabel}
						onPress={() => router.navigate("/")}
					/>
					<DrawerItem
						icon={({ color, size }) => (
							<Feather name="music" color={colors.primary} size={size} />
						)}
						label="Programmation"
						labelStyle={styles.drawerItemLabel}
						onPress={() => router.navigate("/programmation")}
					/>
					<DrawerItem
						icon={({ color, size }) => (
							<Feather name="map" color={colors.primary} size={size} />
						)}
						label="Plan"
						labelStyle={styles.drawerItemLabel}
						onPress={() => router.navigate("/plan")}
					/>
					<DrawerItem
						icon={({ color, size }) => (
							<Feather name="map-pin" color={colors.primary} size={size} />
						)}
						label="Comment venir"
						labelStyle={styles.drawerItemLabel}
						onPress={() => router.navigate("/comment_venir")}
					/>
				</View>
			</View>

			<View style={styles.footer}>
				<Text style={styles.footerText}>© 2025 Festival - Tous droits réservés</Text>
			</View>
		</DrawerContentScrollView>
	);
};

export default DrawerComponent;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		padding: 20,
		backgroundColor: colors.secondary,
		alignItems: 'center',
		marginTop: -4, // To remove the default padding
	},
	logo: {
		width: 100,
		height: 50,
		marginBottom: 10,
	},
	festivalName: {
		color: 'white',
		fontSize: 20,
		fontFamily: fonts.title,
	},
	drawerContent: {
		flex: 1,
		paddingTop: 10,
	},
	drawerSection: {
		marginBottom: 15,
	},
	sectionTitle: {
		fontFamily: fonts.subtitle,
		fontSize: 16,
		marginLeft: 20,
		marginBottom: 5,
		marginTop: 10,
	},
	drawerItemLabel: {
		fontFamily: fonts.body,
		fontSize: 14,
		color: '#333',
	},
	separator: {
		borderBottomColor: colors.quaternary,
		borderBottomWidth: 1,
		marginVertical: 10,
		marginHorizontal: 20,
	},
	footer: {
		padding: 20,
		borderTopWidth: 1,
		borderTopColor: colors.quaternary,
		marginTop: 15,
	},
	footerText: {
		fontFamily: fonts.body,
		fontSize: 12,
		color: '#666',
		textAlign: 'center',
	},
});
