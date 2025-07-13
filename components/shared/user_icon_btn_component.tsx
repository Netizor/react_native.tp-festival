import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../constants/design_constants";
import type UserIconBtnProps from "../../models/props/user_icon_btn_props";

const UserIconBtnComponent = ({
	isHome,
}: UserIconBtnProps): React.JSX.Element => {
	const router = useRouter();

	const handlePress = () => {
		// Navigate to the profile screen
		router.navigate("/profil");
	};

	return (
		<TouchableOpacity
			style={isHome ? stylesInHome.iconBtn : styles.iconBtn}
			onPress={handlePress}
		>
			<Feather name="user" style={styles.icon} />
		</TouchableOpacity>
	);
};

export default UserIconBtnComponent;

const styles = StyleSheet.create({
	iconBtn: {
		width: 40,
		height: 40,
		backgroundColor: colors.primary,
		borderRadius: "50%",
		justifyContent: "center",
		alignItems: "center",
		top: -1,
		right: 15,
	},
	icon: {
		fontSize: 20,
		color: "rgba(255 255 255 / 1)",
	},
});

const stylesInHome = StyleSheet.create({
	iconBtn: {
		...styles.iconBtn,
		position: "absolute",
		top: 35,
		zIndex: 1,
	},
});
