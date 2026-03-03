import React from "react";
import { Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Block, Text, Button } from "../components";
import { useTheme } from "../hooks";

export default function WardDetails() {
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

  

  return (
    <Block padding={sizes.m}>
      <Text h4 marginBottom={sizes.l}>
        {ward.ward_name}
      </Text>

      <Block card shadow padding={sizes.m}>
        <Block row justify="space-between" marginBottom={sizes.sm}>
          <Text semibold>Ward Type</Text>
          <Text>{ward.ward_type || "-"}</Text>
        </Block>

        <Block row justify="space-between" marginBottom={sizes.sm}>
          <Text semibold>Floor Number</Text>
          <Text>{ward.floor_number || "-"}</Text>
        </Block>

        <Block row justify="space-between" marginBottom={sizes.sm}>
          <Text semibold>Total Beds</Text>
          <Text>{ward.total_beds || "-"}</Text>
        </Block>

        <Block row justify="space-between" marginBottom={sizes.sm}>
          <Text semibold>Status</Text>
          <Text color={ward.status ? colors.success : colors.danger}>
            {ward.status ? "Active" : "Inactive"}
          </Text>
        </Block>
      </Block>

      <Block marginTop={sizes.l}>
       

       
      </Block>
    </Block>
  );
}