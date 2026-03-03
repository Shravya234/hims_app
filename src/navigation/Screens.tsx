import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Wards from "../screens/Wards";
import Rooms from "../screens/Rooms";
import Beds from "../screens/Beds";
import WardDetails from "../screens/WardDetails";
import EditWard from "../screens/EditWard";
import AddWard from "../screens/AddWard";
import { useScreenOptions, useTranslation } from "../hooks";
import { Articles, Components, Home, Profile, Register, Pro } from '../screens';
import AddBed from '../screens/AddBed';
import EditBed from '../screens/EditBed';
import BedDetails from '../screens/BedDetails';

import RoomDetails from "../screens/RoomDetails";
import AddRoom from '../screens/AddRoom';
import EditRoom from '../screens/EditRoom';

const Stack = createStackNavigator();

export default () => {
  const { t } = useTranslation();
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions.stack}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Components" component={Components} />
      <Stack.Screen name="Articles" component={Articles} />
      <Stack.Screen name="Pro" component={Pro} />

      <Stack.Screen name="Wards" component={Wards} />
      <Stack.Screen name="Rooms" component={Rooms} />
      <Stack.Screen name="Beds" component={Beds} />

      <Stack.Screen name="AddWard" component={AddWard} />
      <Stack.Screen name="WardDetails" component={WardDetails} />
      <Stack.Screen name="EditWard" component={EditWard} />

      <Stack.Screen name="AddBed" component={AddBed} />
      <Stack.Screen name="EditBed" component={EditBed} />
      <Stack.Screen name="BedDetails" component={BedDetails} />
      
      <Stack.Screen name="AddRoom" component={AddRoom} />
      <Stack.Screen name="RoomDetails" component={RoomDetails} />
      <Stack.Screen name="EditRoom" component={EditRoom} />

      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};