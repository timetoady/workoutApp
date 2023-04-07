import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";

const AddExercise = ({ navigation }) => {
  const [exerciseName, setExerciseName] = useState("");
  const [movementName, setMovementName] = useState("");
  const [numReps, setNumReps] = useState("");
  const [repLengthMin, setRepLengthMin] = useState(0);
  const [repLengthSec, setRepLengthSec] = useState(0);
  const [restLengthMin, setRestLengthMin] = useState(0);
  const [restLengthSec, setRestLengthSec] = useState(0);
  const [exercises, setExercises] = useState([]);
  const [movements, setMovements] = useState([]);

  const addMovement = () => {
    const newMovement = {
      name: movementName,
      numReps,
      repLength: repLengthMin * 60 + repLengthSec,
      restLength: restLengthMin * 60 + restLengthSec,
    };

    setMovements([...movements, newMovement]);
    setMovementName("");
    setNumReps("");
    setRepLengthMin(0);
    setRepLengthSec(0);
    setRestLengthMin(0);
    setRestLengthSec(0);
  };

  const addExercise = () => {
    setExercises([...exercises, { name: exerciseName, movements }]);
    setExerciseName("");
    setMovements([]);
  };

  const removeMovement = (index) => {
    const newMovements = [...movements];
    newMovements.splice(index, 1);
    setMovements(newMovements);
  };

  const renderMovement = ({ item, index, drag, isActive }) => {
    return (
      <TouchableOpacity
        style={[
          styles.movementContainer,
          { backgroundColor: isActive ? "lightblue" : "white" },
        ]}
        onLongPress={drag}
      >
        <Text>
          {item.name} - {item.numReps} reps - {item.repLength}s rep length -{" "}
          {item.restLength}s rest length
        </Text>
        <TouchableOpacity onPress={() => removeMovement(index)}>
          <Text style={styles.removeMovementButton}>−</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <TextInput
        placeholder="Exercise Name"
        onChangeText={setExerciseName}
        value={exerciseName}
      />
      <TextInput
        placeholder="Movement Name"
        onChangeText={setMovementName}
        value={movementName}
      />
      <TextInput
        placeholder="Number of Reps"
        onChangeText={setNumReps}
        value={numReps}
        keyboardType="number-pad"
      />
      <Text>Rep Length:</Text>
      <View style={styles.timeInputContainer}>
        <View style={styles.timeInput}>
          <Text
            style={styles.triangle}
            onPress={() =>
              setRepLengthMin((prev) => (prev < 59 ? prev + 1 : prev))
            }
          >
            ▲
          </Text>
          <TextInput
            onChangeText={setRepLengthMin}
            value={`${repLengthMin}`}
            keyboardType="number-pad"
            style={styles.timeInputText}
          />
          <Text
            style={styles.triangle}
            onPress={() =>
              setRepLengthMin((prev) => (prev > 0 ? prev - 1 : prev))
            }
          >
            ▼
          </Text>
        </View>
        <Text>:</Text>
        <View style={styles.timeInput}>
          <Text
            style={styles.triangle}
            onPress={() =>
              setRepLengthSec((prev) => (prev < 59 ? prev + 1 : prev))
            }
          >
            ▲
          </Text>
          <TextInput
            onChangeText={setRepLengthSec}
            value={`${repLengthSec}`}
            keyboardType="number-pad"
            style={styles.timeInputText}
          />
          <Text
            style={styles.triangle}
            onPress={() =>
              setRepLengthSec((prev) => (prev > 0 ? prev - 1 : prev))
            }
          >
            ▼
          </Text>
        </View>
      </View>
      <Text>Rest Length:</Text>
      <View style={styles.timeInputContainer}>
        <View style={styles.timeInput}>
          <Text
            style={styles.triangle}
            onPress={() =>
              setRestLengthMin((prev) => (prev < 59 ? prev + 1 : prev))
            }
          >
            ▲
          </Text>
          <TextInput
            onChangeText={setRestLengthMin}
            value={`${restLengthMin}`}
            keyboardType="number-pad"
            style={styles.timeInputText}
          />
          <Text
            style={styles.triangle}
            onPress={() =>
              setRestLengthMin((prev) => (prev > 0 ? prev - 1 : prev))
            }
          >
            ▼
          </Text>
        </View>
        <Text>:</Text>
        <View style={styles.timeInput}>
          <Text
            style={styles.triangle}
            onPress={() =>
              setRestLengthSec((prev) => (prev < 59 ? prev + 1 : prev))
            }
          >
            ▲
          </Text>
          <TextInput
            onChangeText={setRestLengthSec}
            value={`${restLengthSec}`}
            keyboardType="number-pad"
            style={styles.timeInputText}
          />
          <Text
            style={styles.triangle}
            onPress={() =>
              setRestLengthSec((prev) => (prev > 0 ? prev - 1 : prev))
            }
          >
            ▼
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={addMovement}>
        <Text>Add movement</Text>
      </TouchableOpacity>
      <DraggableFlatList
        data={movements}
        renderItem={renderMovement}
        keyExtractor={(item, index) => index.toString()}
        onDragEnd={({ data }) => setMovements(data)}
      />
      <TouchableOpacity onPress={addExercise}>
        <Text>Add exercise</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  timeInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeInput: {
    flexDirection: "column",
    alignItems: "center",
  },
  timeInputText: {
    width: 40,
    textAlign: "center",
  },
  triangle: {
    fontSize: 20,
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 15,
    height: "100%",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
  },
  movementContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  removeMovementButton: {
    fontSize: 24,
    color: "red",
  },
});

export default AddExercise;
