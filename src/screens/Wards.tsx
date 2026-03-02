import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  getWardList,
  getTrashWard,
  deleteWard,
  restoreWard,
} from "../../api/wards";

import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { ActivityIndicator } from "react-native";

const Wards = () => {
  const navigation = useNavigation<any>();

  const [showDeleted, setShowDeleted] = useState(false);
  const [search, setSearch] = useState("");
  const [wards, setWards] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const filteredData = wards.filter((item) =>
  item.ward_name
    ?.toLowerCase()
    .includes(search.toLowerCase())
  );


  // Fetch data on screen focus
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [showDeleted])
  );

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = showDeleted
        ? await getTrashWard()
        : await getWardList();

        console.log("API Response:", response);
      setWards(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log("Fetch Error:", error);
      setWards([]);
    } finally {
      setLoading(false);
    }
  };
  // Soft delete function
  const handleSoftDelete = async (id: string) => {
     console.log("Deleting ID:", id);
    await deleteWard(id);
    fetchData();
  };

  // Restore function
  const handleRestore = async (id: string) => {
    await restoreWard(id);
    fetchData();
  };

  const renderItem = ({ item, index }: any) => {
    return (
      <View style={styles.row}>
        <Text style={[styles.cell, styles.sl]}>
          {index + 1}
        </Text>

        <Text style={[styles.cell, styles.name]}>
          {item.ward_name}
        </Text>

        <Text style={[styles.cell, styles.type]}>
          {item.ward_type}
        </Text>

        <Text style={[styles.cell, styles.floor]}>
          {item.floor_number}
        </Text>

        <View style={[styles.statusContainer]}>
          <Text
            style={[
              styles.statusBadge,
              item.status
                ? styles.active
                : styles.inactive,
            ]}
          >
            {item.status ? "Active" : "Inactive"}
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("WardDetails", {
                ward: item,
              })
            }
          >
            <Ionicons
              name="eye-outline"
              size={20}
              color="#555"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("EditWard", {
                ward: item,
              })
            }
          >
            <Ionicons
              name="create-outline"
              size={20}
              color="#007bff"
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons
              name="trash-outline"
              size={20}
              color="red"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 15 }}>
      {/* HEADER */}
      <View style={styles.topHeader}>
        <Text style={styles.heading}>
          Wards
        </Text>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() =>
            navigation.navigate("AddWard")
          
          }
        >
          <Text style={styles.btnText}>+ Add</Text>
        </TouchableOpacity>
      </View>

     
      {/* SEARCH + SHOW DELETED ROW */}
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search Ward..."
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />

        <Text style={{ marginHorizontal: 8 }}>
          Show Deleted
        </Text>

        <Switch
          value={showDeleted}
          onValueChange={setShowDeleted}
        />
      </View>
      

      {/* TABLE HEADER */}
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, styles.sl]}>
          SL
        </Text>
        <Text style={[styles.headerCell, styles.name]}>
          WARD
        </Text>
        <Text style={[styles.headerCell, styles.type]}>
          TYPE
        </Text>
        <Text style={[styles.headerCell, styles.floor]}>
          FLOOR
        </Text>
        <Text
          style={[
            styles.headerCell,
            styles.statusContainer,
          ]}
        >
          STATUS
        </Text>
        <Text
          style={[
            styles.headerCell,
            styles.actions,
          ]}
        >
          ACTIONS
        </Text>
      </View>

      {loading && (
        <ActivityIndicator
          size="large"
          color="#c2185b"
          style={{ marginVertical: 20 }}
        />
      )}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Wards;
const styles = StyleSheet.create({
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  addBtn: {
    backgroundColor: "#c2185b",
    padding: 10,
    borderRadius: 6,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
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
  row: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  cell: {
    textAlign: "center",
  },
  sl: { flex: 0.5 },
  name: { flex: 1.5 },
  type: { flex: 1 },
  floor: { flex: 1 },
  statusContainer: {
    flex: 1.2,
    alignItems: "center",
  },
  actions: {
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  statusBadge: {
    width: 80,
    textAlign: "center",
    paddingVertical: 5,
    borderRadius: 20,
    color: "#fff",
    fontSize: 12,
  },
  active: {
    backgroundColor: "#28a745",
  },
  inactive: {
    backgroundColor: "#dc3545",
  },
});