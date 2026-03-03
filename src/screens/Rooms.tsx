import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Switch,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  getRoomList,
  getTrashRoom,
  deleteRoom,
  restoreRoom,
  forceDeleteRoom,
} from "../../api/rooms";


const Rooms = () => {
  const navigation = useNavigation<any>();

  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);
  const [search, setSearch] = useState("");

   useFocusEffect(
      useCallback(() => {
        fetchData();
      }, [showDeleted])
    );

 const fetchData = async () => {
  try {
    setLoading(true);

    const response = showDeleted
      ? await getTrashRoom()
      : await getRoomList();

    
    console.log("ROOM DATA:", response?.data);

    setRooms(response?.data || []);
  } catch (error) {
    console.log("Room Fetch Error:", error);
    setRooms([]);
  } finally {
    setLoading(false);
  }
};

  const filtered = rooms.filter((item) =>
    item.room_number
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const renderItem = ({ item, index }: any) => (
    <View style={styles.row}>
      <Text style={styles.sl}>{index + 1}</Text>
      <Text style={styles.room}>{item.room_number}</Text>
      <Text style={styles.ward}>{item.ward?.ward_name}</Text>
      <Text style={styles.type}>{item.room_type}</Text>
      <Text
  style={[
    styles.status,
    {
      color:
        item.status === "available"
          ? "#28a745"
          : item.status === "occupied"
          ? "#dc3545"
          : item.status === "maintenance"
          ? "#ffc107"
          : "#6c757d",
    },
  ]}
>
  {item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}
</Text>

      <View style={styles.actions}>
        {showDeleted ? (
          <>
          
            <TouchableOpacity
              onPress={() => restoreRoom(item.id).then(fetchData)}
            >
              <Ionicons name="refresh-outline" size={20} color="green" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => forceDeleteRoom(item.id).then(fetchData)}
            >
              <Ionicons name="trash-outline" size={20} color="red" />
            </TouchableOpacity>
          </>
        ) : (
          <>

          {/* VIEW */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("RoomDetails", { room: item })
            }
          >
            <Ionicons name="eye-outline" size={20} color="#555" />
          </TouchableOpacity>

            {/* EDIT & DELETE */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditRoom", { room: item })
              }
            >
              <Ionicons name="create-outline" size={20} color="#007bff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteRoom(item.id).then(fetchData)}
            >
              <Ionicons name="trash-outline" size={20} color="red" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 15 }}>
      <View style={styles.top}>
        <Text style={styles.heading}>Rooms</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate("AddRoom")}
        >
          <Text style={{ color: "#fff" }}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search Room..."
          style={styles.search}
          value={search}
          onChangeText={setSearch}
        />
        <Switch
          value={showDeleted}
          onValueChange={setShowDeleted}
        />
      </View>

      {/* TABLE HEADER */}
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, styles.sl]}>SL</Text>
        <Text style={[styles.headerCell, styles.room]}>ROOM</Text>
        <Text style={[styles.headerCell, styles.ward]}>WARD</Text>
        <Text style={[styles.headerCell, styles.type]}>TYPE</Text>
        <Text style={[styles.headerCell, styles.status]}>STATUS</Text>
        <Text style={[styles.headerCell, styles.actions]}>ACTIONS</Text>
      </View>

      {loading && <ActivityIndicator size="large" />}

      <FlatList
        data={filtered}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Rooms;

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },

  tableHeader: {
  flexDirection: "row",
  backgroundColor: "#eee",
  paddingVertical: 10,
  borderRadius: 6,
  marginBottom: 5,
},
    headerCell: {
      fontWeight: "bold",
      textAlign: "center",
    },
  addBtn: {
    backgroundColor: "#c2185b",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    gap: 10,
  },

  search: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  sl: {
    flex: 0.5,
    textAlign: "center",
  },

  room: {
    flex: 1.2,
    textAlign: "center",
  },

  ward: {
    flex: 1.5,
    textAlign: "center",
  },

  type: {
    flex: 1,
    textAlign: "center",
  },

  status: {
  flex: 1.2,
  textAlign: "center",
  fontWeight: "600",
},

  actions: {
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});