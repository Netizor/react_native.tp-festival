import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ActivityIndicator,
	Alert,
} from "react-native";
import {
	GestureHandlerRootView,
	ScrollView,
} from "react-native-gesture-handler";
import { colors, fonts } from "../../constants/design_constants";
import type Stage from "../../models/stage";
import type StageType from "../../models/stage_type";
import StageApiService from "../../services/stage_api_services";
import StringUtilsService from "../../services/string_utils_service";
import { Image } from "expo-image";

const ProgrammationScreen = (): React.JSX.Element => {
	const [typeStage, setTypeStage] = useState<StageType[]>();
	const [stage, setStage] = useState<Map<number, Stage[]>>();
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		const fetchTypeStage = async () => {
			try {
				setLoading(true);
				setError(null);

				const data = await new StageApiService().getTypeStage();
				setTypeStage(data);

				const stageMap: Map<number, Stage[]> = new Map();
				for (const st of data) {
					const stage = await new StageApiService().getStageByType(st.id);
					stageMap.set(st.id, stage);
				}

				setStage(stageMap);
			} catch (err) {
				console.error("Error fetching stage data:", err);
				setError("Une erreur est survenue lors du chargement des données. Veuillez réessayer.");
			} finally {
				setLoading(false);
			}
		};

		fetchTypeStage();
	}, []);

	const handleRetry = () => {
		setTypeStage(undefined);
		setStage(undefined);
		setLoading(true);
		setError(null);

		// Re-fetch data
		const fetchTypeStage = async () => {
			try {
				const data = await new StageApiService().getTypeStage();
				setTypeStage(data);

				const stageMap: Map<number, Stage[]> = new Map();
				for (const st of data) {
					const stage = await new StageApiService().getStageByType(st.id);
					stageMap.set(st.id, stage);
				}

				setStage(stageMap);
				setLoading(false);
			} catch (err) {
				console.error("Error fetching stage data:", err);
				setError("Une erreur est survenue lors du chargement des données. Veuillez réessayer.");
				setLoading(false);
			}
		};

		fetchTypeStage();
	};

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color={colors.primary} />
				<Text style={styles.loadingText}>Chargement de la programmation...</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View style={styles.errorContainer}>
				<Feather name="alert-circle" size={50} color={colors.ternary} />
				<Text style={styles.errorText}>{error}</Text>
				<TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
					<Text style={styles.retryButtonText}>Réessayer</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<GestureHandlerRootView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Programmation</Text>
				<Text style={styles.headerSubtitle}>Découvrez tous les artistes par scène</Text>
			</View>
			<ScrollView>
				<View style={styles.content}>
					{Array.isArray(typeStage) && typeStage.length > 0 ? (
						typeStage.map((stageType: StageType) => (
							<View style={styles.containerStage} key={stageType.id}>
								<View style={styles.stageTypeHeader}>
									<Feather name="music" size={22} color={colors.primary} style={styles.stageTypeIcon} />
									<Text style={styles.stageTypeName}>
										{stageType.name}
									</Text>
								</View>
								<View style={styles.stageList}>
									{stage?.get(stageType.id)?.map((st) => (
										<TouchableOpacity
											onPress={() => router.navigate(`stage/${st.id}`)}
											key={st.id}
											style={styles.stageButton}
										>
											<View style={styles.itemStage}>
												<Text style={styles.stageName}>
													{new StringUtilsService().getTextOverflow(
														st.name,
														40,
													)}
												</Text>
												<Feather size={20} name="chevron-right" color={colors.primary} />
											</View>
										</TouchableOpacity>
									))}
								</View>
							</View>
						))
					) : (
						<View style={styles.emptyContainer}>
							<Feather name="calendar" size={50} color={colors.secondary} />
							<Text style={styles.emptyText}>Aucune programmation disponible pour le moment</Text>
						</View>
					)}
				</View>
			</ScrollView>
		</GestureHandlerRootView>
	);
};

export default ProgrammationScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.quaternary,
	},
	header: {
		backgroundColor: colors.secondary,
		padding: 20,
		paddingBottom: 25,
	},
	headerTitle: {
		fontSize: 28,
		fontFamily: fonts.subtitle,
		color: "white",
		marginBottom: 5,
	},
	headerSubtitle: {
		fontSize: 16,
		fontFamily: fonts.body,
		color: "white",
		opacity: 0.8,
	},
	content: {
		width: Dimensions.get("screen").width,
		gap: 20,
		padding: 20,
		backgroundColor: colors.quaternary,
		paddingBottom: 40,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.quaternary,
		padding: 20,
	},
	loadingText: {
		marginTop: 15,
		fontSize: 16,
		fontFamily: fonts.body,
		color: colors.secondary,
	},
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.quaternary,
		padding: 20,
	},
	errorText: {
		marginTop: 15,
		marginBottom: 20,
		fontSize: 16,
		fontFamily: fonts.body,
		textAlign: "center",
		color: colors.ternary,
	},
	retryButton: {
		backgroundColor: colors.primary,
		paddingVertical: 12,
		paddingHorizontal: 25,
		borderRadius: 5,
	},
	retryButtonText: {
		color: "white",
		fontFamily: fonts.subtitle,
		fontSize: 16,
	},
	emptyContainer: {
		alignItems: "center",
		justifyContent: "center",
		padding: 40,
	},
	emptyText: {
		marginTop: 15,
		fontSize: 16,
		fontFamily: fonts.body,
		textAlign: "center",
		color: colors.secondary,
	},
	containerStage: {
		gap: 10,
		marginBottom: 20,
	},
	stageTypeHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 5,
	},
	stageTypeIcon: {
		marginRight: 10,
	},
	stageTypeName: {
		fontSize: 22,
		fontFamily: fonts.subtitle,
		color: colors.primary,
	},
	stageList: {
		width: "100%",
		backgroundColor: "#fff",
		borderRadius: 8,
		overflow: "hidden",
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	stageButton: {
		width: "100%",
	},
	itemStage: {
		paddingVertical: 15,
		paddingHorizontal: 15,
		borderBottomColor: colors.quaternary,
		borderBottomWidth: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	stageName: {
		fontSize: 16,
		fontFamily: fonts.body,
	},
});
