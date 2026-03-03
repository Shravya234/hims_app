import React, { useState, useEffect } from "react";
import { Alert, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Block, Text, Button } from "../components";
import { useTheme } from "../hooks";
import { Picker } from "@react-native-picker/picker";

import { createRoom } from "../../api/rooms";
import { getWardList } from "../../api/wards";

export default function AddRoom() {
  const { sizes, colors, gradients } = useTheme();
  const navigation = useNavigation<any>();

  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [wardId, setWardId] = useState("");
  const [totalBeds, setTotalBeds] = useState("");
  const [status, setStatus] = useState("available");
  const [wards, setWards] = useState<any[]>([]);

  useEffect(() => {
    fetchWards();
  }, []);

  const fetchWards = async () => {
    const res = await getWardList();
    setWards(res.data || []);
  };

  const handleSave = async () => {
    if (!roomNumber || !wardId) {
      Alert.alert("Validation", "Room number and ward required");
      return;
    }

    try {
      await createRoom({
        room_number: roomNumber,
        room_type: roomType,
        ward_id: wardId,
        total_beds: totalBeds ? Number(totalBeds) : null,
        status: status,
      });

      Alert.alert("Success", "Room added successfully");
      navigation.goBack();
    } catch (error) {
      console.log("Create Room Error:", error);
      Alert.alert("Error", "Failed to create room");
    }
  };

  return (
    <Block flex={1} padding={sizes.m}>
      <Text h4 marginBottom={sizes.l}>Add Room</Text>

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
      <View 
      style={{ borderWidth: 1, 
                borderColor: "#ccc", 
                borderRadius: 8,
                marginBottom: 15,
                 }}>
        <Picker
          selectedValue={wardId}
          onValueChange={(value) => setWardId(value)}
        >
          <Picker.Item label="Select Ward" value="" />
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

      <Text>Status</Text>
        <View style={{
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 15,
        }}>
        <Picker
            selectedValue={status}
            onValueChange={(value) => setStatus(value)}
        >
            <Picker.Item label="Available" value="available" />
            <Picker.Item label="Occupied" value="occupied" />
            <Picker.Item label="Maintenance" value="maintenance" />
            <Picker.Item label="Cleaning" value="cleaning" />
        </Picker>
        </View>

      <Button gradient={gradients.primary} onPress={handleSave}>
        <Text white semibold>Save Room</Text>
      </Button>
    </Block>
  );
}