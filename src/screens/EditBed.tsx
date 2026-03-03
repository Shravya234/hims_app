import React, { useState } from "react";
import { Alert, TextInput } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

import { Block, Text, Button } from "../components";
import { useTheme } from "../hooks";
import { updateBed } from "../../api/beds";

export default function EditBed() {
  const { sizes, colors, gradients } = useTheme();

  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const bed = route?.params?.bed || {};

  const [bedCode, setBedCode] = useState(bed.bed_code || "");
  const [wardId, setWardId] = useState(bed.ward?.id || "");
  const [roomNumber, setRoomNumber] = useState(bed.room_number || "");
  const [bedType, setBedType] = useState(bed.bed_type || "");
  const [status, setStatus] = useState(bed.status || "Available");

  const bedTypes = ["General", "ICU", "Private", "Emergency"];
  const statuses = ["Available", "Occupied", "Maintenance", "Cleaning"];

  const handleUpdate = async () => {
    if (!bedCode) return Alert.alert("Validation", "Bed code required");

    try {
      await updateBed(bed.id, {
        bed_code: bedCode,
        ward_id: wardId,
        room_number: roomNumber,
        bed_type: bedType,
        status,
      });

      Alert.alert("Success", "Bed updated");
      navigation.goBack();
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  };

  if (!bed.id) {
    return (
      <Block flex={1} center>
        <Text>No bed data available</Text>
      </Block>
    );
  }

  return (
    <Block flex={1} padding={sizes.m}>
      <Text h4 marginBottom={sizes.l}>Edit Bed</Text>

      <Text>Bed Code</Text>
      <TextInput
        value={bedCode}
        onChangeText={setBedCode}
        style={{
          borderWidth: 1,
          borderColor: colors.gray,
          borderRadius: 8,
          padding: 12,
          marginBottom: sizes.m,
        }}
      />

      <Text>Ward</Text>
      <Block style={{ borderWidth: 1, borderColor: colors.gray, borderRadius: 8, marginBottom: sizes.m }}>
        <Picker selectedValue={wardId} onValueChange={setWardId}>
          <Picker.Item label="Select Ward" value="" />
          <Picker.Item label={bed.ward?.ward_name || "Unknown"} value={bed.ward?.id || ""} />
        </Picker>
      </Block>

      <Text>Room Number</Text>
      <TextInput
        value={roomNumber}
        onChangeText={setRoomNumber}
        style={{
          borderWidth: 1,
          borderColor: colors.gray,
          borderRadius: 8,
          padding: 12,
          marginBottom: sizes.m,
        }}
      />

      <Text>Bed Type</Text>
      <Block style={{ borderWidth: 1, borderColor: colors.gray, borderRadius: 8, marginBottom: sizes.m }}>
        <Picker selectedValue={bedType} onValueChange={setBedType}>
          {bedTypes.map((t) => (
            <Picker.Item key={t} label={t} value={t} />
          ))}
        </Picker>
      </Block>

      <Text>Status</Text>
      <Block style={{ borderWidth: 1, borderColor: colors.gray, borderRadius: 8, marginBottom: sizes.l }}>
        <Picker selectedValue={status} onValueChange={setStatus}>
          {statuses.map((s) => (
            <Picker.Item key={s} label={s} value={s} />
          ))}
        </Picker>
      </Block>

      <Button gradient={gradients.primary} onPress={handleUpdate}>
        <Text white semibold>Update Bed</Text>
      </Button>
    </Block>
  );
}