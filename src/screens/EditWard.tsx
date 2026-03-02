import React, { useState } from "react";
import { Alert, TextInput, Switch } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Block, Text, Button } from "../components";
import { useTheme } from "../hooks";

export default function EditWard() {
  const { sizes, colors, gradients } = useTheme();

  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const ward = route?.params?.ward;

  if (!ward) {
    return (
      <Block flex={1} center>
        <Text>No ward data available</Text>
      </Block>
    );
  }

  const [wardName, setWardName] = useState(ward.ward_name || "");
  const [wardType, setWardType] = useState(ward.ward_type || "");
  const [floorNumber, setFloorNumber] = useState(
    ward.floor_number ? String(ward.floor_number) : ""
  );
  const [totalBeds, setTotalBeds] = useState(
    ward.total_beds ? String(ward.total_beds) : ""
  );
  const [status, setStatus] = useState(ward.status ?? true);

  const handleUpdate = () => {
    if (!wardName) {
      Alert.alert("Validation", "Ward name is required");
      return;
    }

    console.log("Updated Ward:", {
      wardName,
      wardType,
      floorNumber,
      totalBeds,
      status,
    });

    Alert.alert("Success", "Ward updated successfully");
    navigation.goBack();
  };

  return (
    <Block flex={1} padding={sizes.m}>
      <Text h4 marginBottom={sizes.l}>
        Edit Ward
      </Text>

      <Text marginBottom={4}>Ward Name</Text>
      <TextInput
        value={wardName}
        onChangeText={setWardName}
        placeholder="Enter ward name"
        style={{
          borderWidth: 1,
          borderColor: colors.gray,
          borderRadius: 8,
          padding: 12,
          marginBottom: sizes.m,
        }}
      />

      <Text marginBottom={4}>Ward Type</Text>
      <TextInput
        value={wardType}
        onChangeText={setWardType}
        placeholder="Enter ward type"
        style={{
          borderWidth: 1,
          borderColor: colors.gray,
          borderRadius: 8,
          padding: 12,
          marginBottom: sizes.m,
        }}
      />

      <Text marginBottom={4}>Floor Number</Text>
      <TextInput
        value={floorNumber}
        onChangeText={setFloorNumber}
        placeholder="Enter floor number"
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: colors.gray,
          borderRadius: 8,
          padding: 12,
          marginBottom: sizes.m,
        }}
      />

      <Text marginBottom={4}>Total Beds</Text>
      <TextInput
        value={totalBeds}
        onChangeText={setTotalBeds}
        placeholder="Enter total beds"
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: colors.gray,
          borderRadius: 8,
          padding: 12,
          marginBottom: sizes.m,
        }}
      />

      <Block row justify="space-between" align="center" marginBottom={sizes.l}>
        <Text>Status</Text>
        <Switch
          value={status}
          onValueChange={setStatus}
          trackColor={{
            false: colors.gray,
            true: colors.success,
          }}
        />
      </Block>

      <Button gradient={gradients.primary} onPress={handleUpdate}>
        <Text white semibold>
          Update Ward
        </Text>
      </Button>
    </Block>
  );
}