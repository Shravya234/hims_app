import React from "react";
import { useRoute } from "@react-navigation/native";
import { Block, Text } from "../components";
import { useTheme } from "../hooks";

export default function RoomDetails() {
  const { sizes, colors } = useTheme();
  const route = useRoute<any>();

  const room = route?.params?.room;

  if (!room) {
    return (
      <Block flex={1} center>
        <Text>No room data available</Text>
      </Block>
    );
  }

  return (
    <Block padding={sizes.m}>
      <Text h4 marginBottom={sizes.l}>
        Room Details
      </Text>

      <Block card shadow padding={sizes.m}>
        <Block row justify="space-between" marginBottom={sizes.sm}>
          <Text semibold>Room Number</Text>
          <Text>{room.room_number}</Text>
        </Block>

        <Block row justify="space-between" marginBottom={sizes.sm}>
          <Text semibold>Ward</Text>
          <Text>{room.ward?.ward_name || "-"}</Text>
        </Block>

        <Block row justify="space-between" marginBottom={sizes.sm}>
          <Text semibold>Room Type</Text>
          <Text>{room.room_type || "-"}</Text>
        </Block>

        <Block row justify="space-between" marginBottom={sizes.sm}>
          <Text semibold>Total Beds</Text>
          <Text>{room.total_beds || "-"}</Text>
        </Block>

       <Block row justify="space-between" align="center">
  <Text semibold>Status</Text>

  <Text color={
      room.status === "available"
        ? colors.success
        : room.status === "occupied"
        ? colors.danger
        : room.status === "maintenance"
        ? colors.warning
        : colors.info
    }
  >
    {room.status
      ? room.status.charAt(0).toUpperCase() +
        room.status.slice(1)
      : "-"}
  </Text>
</Block>

      </Block>
          <Block marginTop={sizes.l}>
       

       
      </Block>
    </Block>
  );
}