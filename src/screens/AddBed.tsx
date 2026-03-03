import React, { useEffect, useState } from "react";
import { Alert, TextInput, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

import { Block, Text, Button } from "../components";
import { useTheme } from "../hooks";

import { createBed } from "../../api/beds";
import { getWardList } from "../../api/wards";

export default function AddBed() {
  const { sizes, colors, gradients } = useTheme();
  const navigation = useNavigation<any>();

  const [bedCode, setBedCode] = useState("");
  const [wardId, setWardId] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [bedType, setBedType] = useState("");
  const [status, setStatus] = useState("Available");

  const [wards, setWards] = useState<any[]>([]);
  const [loadingWards, setLoadingWards] = useState(true);

  // ===============================
  // FETCH WARDS FROM API
  // ===============================
  useEffect(() => {
    loadWards();
  }, []);

  const loadWards = async () => {
  try {
    const res = await getWardList();

    console.log("WARD RESPONSE:", res);

    setWards(
      Array.isArray(res?.data) ? res.data : []
    );
  } catch (err) {
    console.log("Ward fetch error", err);
    Alert.alert("Error", "Unable to load wards");
  } finally {
    setLoadingWards(false);
  }
};

  // FIXED BED TYPES
  const bedTypes = ["General", "ICU", "Private", "Emergency"];
  const statuses = ["Available", "Occupied", "Maintenance", "Cleaning"];

  // ===============================
  // SAVE BED
  // ===============================
  const handleSave = async () => {
    if (!bedCode) return Alert.alert("Validation", "Bed code is required");
    if (!wardId) return Alert.alert("Validation", "Select ward");
    if (!roomNumber) return Alert.alert("Validation", "Room number is required");
    if (!bedType) return Alert.alert("Validation", "Select bed type");

    try {
      const payload = {
        bed_code: bedCode,
        ward_id: wardId,
        room_number: roomNumber,
        bed_type: bedType,
        status,
      };

      const res = await createBed(payload);
      console.log("Created bed:", res);

      Alert.alert("Success", "Bed added successfully");
      navigation.goBack();
    } catch (err: any) {
      console.error("Add bed error", err);
      Alert.alert("Error", err.message || "Unable to create bed");
    }
  };

  return (
    <Block flex={1} padding={sizes.m}>
      <Text h4 marginBottom={sizes.l}>
        Add Bed
      </Text>

      {/* BED CODE */}
      <Text marginBottom={4}>Bed Code</Text>
      <TextInput
        value={bedCode}
        onChangeText={setBedCode}
        placeholder="Enter bed code"
        style={{
          borderWidth: 1,
          borderColor: colors.gray,
          borderRadius: 8,
          padding: 12,
          marginBottom: sizes.m,
        }}
      />

      {/* WARD PICKER */}
      <Text marginBottom={4}>Ward</Text>
      <Block
        style={{
          borderWidth: 1,
          borderColor: colors.gray,
          borderRadius: 8,
          marginBottom: 15,

          
        }}
      >
        {loadingWards ? (
          <ActivityIndicator style={{ padding: 10 }} />
        ) : (
          <Picker
            selectedValue={wardId}
            onValueChange={(value) => setWardId(value)}
          >
            <Picker.Item label="Select Ward" value="" />
            {wards.map((w) => (
              <Picker.Item
                key={w.id}
                label={w.ward_name}
                value={w.id}
              />
            ))}
          </Picker>
        )}
      </Block>

      {/* ROOM NUMBER */}
      <Text marginBottom={4}>Room Number</Text>
      <TextInput
        value={roomNumber}
        onChangeText={setRoomNumber}
        placeholder="Enter room number"
        style={{
          borderWidth: 1,
          borderColor: colors.gray,
          borderRadius: 8,
          padding: 12,
          marginBottom: sizes.m,
        }}
      />

      {/* BED TYPE */}
      <Text marginBottom={4}>Bed Type</Text>
      <Block
        style={{
          borderWidth: 1,
          borderColor: colors.gray,
          borderRadius: 8,
          marginBottom: sizes.m,
        }}
      >
        <Picker
          selectedValue={bedType}
          onValueChange={(value) => setBedType(value)}
        >
          <Picker.Item label="Select Bed Type" value="" />
          {bedTypes.map((t) => (
            <Picker.Item key={t} label={t} value={t} />
          ))}
        </Picker>
      </Block>

      {/* STATUS */}
      <Text marginBottom={4}>Status</Text>
      <Block
        style={{
          borderWidth: 1,
          borderColor: colors.gray,
          borderRadius: 8,
          marginBottom: sizes.l,
        }}
      >
        <Picker
          selectedValue={status}
          onValueChange={(value) => setStatus(value)}
        >
          {statuses.map((s) => (
            <Picker.Item key={s} label={s} value={s} />
          ))}
        </Picker>
      </Block>

      <Button gradient={gradients.primary} onPress={handleSave}>
        <Text white semibold>
          Save Bed
        </Text>
      </Button>
    </Block>
  );
}