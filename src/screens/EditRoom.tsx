import React, { useState, useEffect } from "react";
import { Alert, TextInput, View } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Block, Text, Button } from "../components";
import { useTheme } from "../hooks";
import { Picker } from "@react-native-picker/picker";

import { updateRoom } from "../../api/rooms";
import { getWardList } from "../../api/wards";

export default function EditRoom() {
  const { sizes, colors, gradients } = useTheme();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const room = route?.params?.room;

  const [roomNumber, setRoomNumber] = useState(room?.room_number || "");
  const [roomType, setRoomType] = useState(room?.room_type || "");
  const [wardId, setWardId] = useState(room?.ward_id || "");
  const [totalBeds, setTotalBeds] = useState(
    room?.total_beds ? String(room.total_beds) : ""
  );
  const [status, setStatus] = useState(room?.status || "available");
  const [wards, setWards] = useState<any[]>([]);

  useEffect(() => {
    fetchWards();
  }, []);

  const fetchWards = async () => {
    const res = await getWardList();
    setWards(res.data || []);
  };

  const handleUpdate = async () => {
    if (!roomNumber || !wardId) {
      Alert.alert("Validation", "Room number and ward required");
      return;
    }

    try {
      await updateRoom(room.id, {
        room_number: roomNumber,
        room_type: roomType,
        ward_id: wardId,
        total_beds: totalBeds ? Number(totalBeds) : null,
        status: status,
      });

      Alert.alert("Success", "Room updated successfully");
      navigation.goBack();
    } catch (error) {
      console.log("Update Room Error:", error);
      Alert.alert("Error", "Failed to update room");
    }
  };

  return (
    <Block flex={1} padding={sizes.m}>
      <Text h4 marginBottom={sizes.l}>Edit Room</Text>

      <Text>Room Number</Text>
      <TextInput
        value={roomNumber}
        onChangeText={setRoomNumber}
        style={{
          borderWidth: 1,
          borderColor: colors.gray,
          borderRadius: 8,
          padding: 10,
          marginBottom: sizes.m,
        }}
      />

      <Text>Ward</Text>
      <View style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8,marginBottom: 15, }}>
        <Picker
          selectedValue={wardId}
          onValueChange={(value) => setWardId(value)}
        >
          {wards.map((ward) => (
            <Picker.Item
              key={ward.id}
              label={ward.ward_name}
              value={ward.id}
            />
          ))}
        </Picker>
      </View>

      <Text>Room Type</Text>
        <View style={{
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 15,
        }}>
        <Picker
            selectedValue={roomType}
            onValueChange={(value) => setRoomType(value)}
        >
            <Picker.Item label="General" value="General" />
            <Picker.Item label="ICU" value="ICU" />
            <Picker.Item label="Private" value="Private" />
            <Picker.Item label="Semi-Private" value="Semi-Private" />
        </Picker>
        </View>

      <Text>Total Beds</Text>
      <TextInput
        value={totalBeds}
        onChangeText={setTotalBeds}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: colors.gray,
          borderRadius: 8,
          padding: 10,
          marginBottom: sizes.l,
        }}
      />

      <Button gradient={gradients.primary} onPress={handleUpdate}>
        <Text white semibold>Update Room</Text>
      </Button>
    </Block>
  );
}