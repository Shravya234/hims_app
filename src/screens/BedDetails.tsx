import React from "react";
import { Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Block, Text, Button } from "../components";
import { useTheme } from "../hooks";
import { deleteBed } from "../../api/beds";

export default function BedDetails() {
  const { sizes, colors, gradients } = useTheme();

  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const bed = route?.params?.bed;

  if (!bed) {
    return (
      <Block flex={1} center>
        <Text>No bed data available</Text>
      </Block>
    );
  }

  const handleDelete = () => {
    Alert.alert("Delete Bed", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteBed(bed.id);
            Alert.alert("Success", "Bed deleted");
            navigation.goBack();
          } catch (error) {
            Alert.alert("Error", "Failed to delete bed");
          }
        },
      },
    ]);
  };

  return (
    <Block flex={1} padding={sizes.m}>
      <Text h4 marginBottom={sizes.l}>
        {bed.bed_code}
      </Text>

      <Block card shadow padding={sizes.m}>
        <Block row justify="space-between" marginBottom={sizes.sm}>
          <Text semibold>Ward</Text>
          <Text>{bed.ward?.ward_name || "-"}</Text>
        </Block>

        <Block row justify="space-between" marginBottom={sizes.sm}>
          <Text semibold>Room Number</Text>
          <Text>{bed.room_number || "-"}</Text>
        </Block>

        <Block row justify="space-between" marginBottom={sizes.sm}>
          <Text semibold>Bed Type</Text>
          <Text>{bed.bed_type || "-"}</Text>
        </Block>

        <Block row justify="space-between" marginBottom={sizes.sm}>
          <Text semibold>Status</Text>
          <Text
            color={
              bed.status === "Available"
                ? colors.success
                : bed.status === "Occupied"
                ? colors.danger
                : colors.warning
            }
          >
            {bed.status || "-"}
          </Text>
        </Block>
      </Block>

      <Block marginTop={sizes.l}>
        <Button
          gradient={gradients.primary}
          marginBottom={sizes.sm}
          onPress={() =>
            navigation.navigate("EditBed", { bed })
          }
        >
          <Text white semibold>
            Edit Bed
          </Text>
        </Button>

        <Button color={colors.danger} onPress={handleDelete}>
          <Text white semibold>
            Delete Bed
          </Text>
        </Button>
      </Block>
    </Block>
  );
}