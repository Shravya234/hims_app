import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Switch,
  ActivityIndicator,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import {
  getBedList,
  getTrashBed,
  deleteBed,
  restoreBed,
  permanentDeleteBed,
} from "../../api/beds";

const Beds = () => {
  const navigation = useNavigation<any>();

  const [showDeleted, setShowDeleted] = useState(false);
  const [search, setSearch] = useState("");
  const [beds, setBeds] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // ================= FETCH =================
  const fetchData = async () => {
    try {
      setLoading(true);

      const response = showDeleted
        ? await getTrashBed()
        : await getBedList();

      setBeds(Array.isArray(response) ? response : []);
    } catch (e) {
      console.log("Fetch Error", e);
      setBeds([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [showDeleted])
  );

  // ================= SEARCH =================
  const filteredData = beds.filter((item) =>
    String(item.bed_code || "")
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    String(item.ward?.ward_name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ================= DELETE =================
  const handleDelete = async (id: string) => {
    // If showing deleted items, use permanent delete
    if (showDeleted) {
      console.log("Permanently deleting id", id);
      try {
        await permanentDeleteBed(id);
        Alert.alert("Success", "Bed permanently deleted");
        fetchData();
      } catch (e: any) {
        console.log("Permanent delete error", e);
        Alert.alert("Error", e.message || "Failed to permanently delete bed");
      }
    } else {
      // Otherwise soft delete
      console.log("Soft deleting id", id);
      try {
        await deleteBed(id);
        fetchData();
      } catch (e: any) {
        console.log("Delete error", e);
        Alert.alert("Error", e.message || "Failed to delete bed");
      }
    }
  };

  const handleRestore = async (id: string) => {
    console.log("Attempting restore for id", id);
    try {
      const res = await restoreBed(id);
      console.log("Restore response", res);
      Alert.alert("Success", "Bed restored");
      fetchData();
    } catch (e: any) {
      console.log("Restore error", e);
      Alert.alert("Error", e.message || "Failed to restore bed");
    }
  };

  // ================= STATUS COLOR =================
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Available":
        return styles.available;
      case "Occupied":
        return styles.occupied;
      case "Maintenance":
        return styles.maintenance;
      case "Cleaning":
        return styles.cleaning;
      default:
        return styles.available;
    }
  };

  // ================= ROW =================
  const renderItem = ({ item, index }: any) => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.sl]}>
        {index + 1}
      </Text>

      <Text style={[styles.cell, styles.code]}>
        {item.bed_code}
      </Text>

      <Text style={[styles.cell, styles.ward]}>
        {item.ward?.ward_name || "-"}
      </Text>

      <Text style={[styles.cell, styles.room]}>
        {item.room_number || "-"}
      </Text>

      

      <View style={styles.statusContainer}>
        <Text
          style={[
            styles.statusBadge,
            getStatusStyle(item.status),
          ]}
        >
          {item.status}
        </Text>
      </View>

      <View style={styles.actions}>
        {showDeleted ? (
          <>
            <TouchableOpacity onPress={() => handleRestore(item.id)}>
              <Ionicons name="refresh-outline" size={20} color="green" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Ionicons name="trash-outline" size={20} color="red" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("BedDetails", { bed: item })
              }
            >
              <Ionicons name="eye-outline" size={20} color="#555" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditBed", { bed: item })
              }
            >
              <Ionicons name="create-outline" size={20} color="#007bff" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Ionicons name="trash-outline" size={20} color="red" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  // ================= UI =================
  return (
    <View style={{ flex: 1, padding: 15 }}>
      <View style={styles.topHeader}>
        <Text style={styles.heading}>Beds</Text>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate("AddBed")}
        >
          <Text style={styles.btnText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search Bed..."
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />

        <Text style={{ marginHorizontal: 8 }}>Show Deleted</Text>

        <Switch value={showDeleted} onValueChange={setShowDeleted} />
      </View>

      {/* TABLE HEADER */}
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, styles.sl]}>SL</Text>
        <Text style={[styles.headerCell, styles.code]}>BED</Text>
        <Text style={[styles.headerCell, styles.ward]}>WARD</Text>
        <Text style={[styles.headerCell, styles.room]}>ROOM</Text>
        <Text style={[styles.headerCell, { flex: 1 }]}>
          STATUS
        </Text>
        <Text style={[styles.headerCell, styles.actions]}>ACTIONS</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#c2185b" />
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default Beds;

// ================= STYLES =================
const styles = StyleSheet.create({
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  heading: { fontSize: 20, fontWeight: "bold" },
  addBtn: { backgroundColor: "#c2185b", padding: 10, borderRadius: 6 },
  btnText: { color: "#fff", fontWeight: "bold" },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    backgroundColor: "#fff",
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#eee",
    paddingVertical: 10,
    borderRadius: 6,
  },

  row: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  headerCell: { fontWeight: "bold", textAlign: "center" },
  cell: { textAlign: "center" },

  sl: { flex: 0.5 },
  code: { flex: 1 },
  ward: { flex: 1 },
  room: { flex: 0.9 },
  type: { flex: 1 },

  statusContainer: { flex: 1, alignItems: "center" },

  actions: {
    flex: 1.2,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  statusBadge: {
    width: 60,
    textAlign: "center",
    paddingVertical: 5,
    borderRadius: 20,
    color: "#fff",
    fontSize: 12,
  },

  available: { backgroundColor: "#28a745" },
  occupied: { backgroundColor: "#dc3545" },
  maintenance: { backgroundColor: "#ff9800" },
  cleaning: { backgroundColor: "#03a9f4" },
});