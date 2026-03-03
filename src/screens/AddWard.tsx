import React, { useState } from "react";
import { Alert, TextInput, Switch, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Block, Text, Button } from "../components";
import { useTheme } from "../hooks";
import { Picker } from "@react-native-picker/picker";
import { createWard } from "../../api/wards";

export default function AddWard() {
  const { sizes, colors, gradients } = useTheme();
  const navigation = useNavigation<any>();

  const [wardName, setWardName] = useState("");
  const [wardType, setWardType] = useState("");
  const [floorNumber, setFloorNumber] = useState("");
  const [totalBeds, setTotalBeds] = useState("");
  const [status, setStatus] = useState(true);
  
const handleSave = async () => {
  if (!wardName) {
    Alert.alert("Validation", "Ward name is required");
    return;
  }

  try {
    await createWard({
      ward_name: wardName,
      ward_type: wardType,
      floor_number: floorNumber ? Number(floorNumber) : null,
      total_beds: totalBeds ? Number(totalBeds) : null,
      status: status,
    });

    Alert.alert("Success", "Ward added successfully");

    navigation.navigate("Wards"); // 🔥 important
  } catch (error) {
    console.log("Create Ward Error:", error);
    Alert.alert("Error", "Failed to create ward");
  }
};

  return (
    <Block flex={1} padding={sizes.m}>
      <Text h4 marginBottom={sizes.l}>
        Add Ward
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

      <Text style={{ marginBottom: 4 }}>
        Ward Type
        </Text>

        <View
        style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            marginBottom: 15,
        }}
        >
        <Picker
            selectedValue={wardType}
            onValueChange={(itemValue) =>
            setWardType(itemValue)
            }
        >
            <Picker.Item label="Select Type" value="" />
            <Picker.Item label="General" value="General" />
            <Picker.Item label="ICU" value="ICU" />
            <Picker.Item label="Private" value="Private" />
            <Picker.Item label="Semi-Private" value="Semi-Private" />
        </Picker>
        </View>

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

      <Button gradient={gradients.primary} onPress={handleSave}>
        <Text white semibold>
          Save Ward
        </Text>
      </Button>
    </Block>
  );
}