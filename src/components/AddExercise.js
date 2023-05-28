import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";

const screenWidth = Dimensions.get("window").width;

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
  const [nextItemType, setNextItemType] = useState(null);
  const [repOrTimed, setRepOrTimed] = useState(null);
  const [showAddAnother, setShowAddAnother] = useState(null);


  // TODO: add place for excersizes to exist, in a DraggableFlatList like the movements.
  // May have to raise its state, do another "add another exersize option", or when added, move back to workout screen 
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
    setNextItemType(null);
    setRepOrTimed(null);
    setShowAddAnother(true);
  };

  const addExercise = () => {
    setExercises([...exercises, { name: exerciseName, movements }]);
    setExerciseName("");
    setMovements([]);
    setShowAddAnother(false);
    setNextItemType(null);
  };

  const addAnother = () => {
    setShowAddAnother(false);
    setNextItemType("");
  };

  const removeMovement = (index) => {
    const newMovements = [...movements];
    newMovements.splice(index, 1);
    setMovements(newMovements);
  };

  const setExerciseFieldsReady = () => {
    setNextItemType((oldData) => ("" !== oldData ? "" : oldData));
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
          {item.name}
          {item.numReps > 0 && `${item.numReps} reps`}
          {item.repLength > 0 && `${item.repLength}s rep length`}
          {item.restLength > 0 && `${item.restLength}s rest length`}
        </Text>
        <TouchableOpacity onPress={() => removeMovement(index)}>
          <Text style={styles.removeMovementButton}>−</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.addExerciseContainer}>
      <View style={styles.exerciseNameContainer}>
        <TextInput
          placeholder="Exercise Name"
          onChangeText={setExerciseName}
          value={exerciseName}
        />
        <TouchableOpacity
          style={[styles.button, styles.nextButton]}
          onPress={setExerciseFieldsReady}
        >
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
      {showAddAnother && (
        <TouchableOpacity
          style={[styles.restButton]}
          onPress={addAnother}
        >
          <Text>Add another movement?</Text>
        </TouchableOpacity>
      )}
      {exerciseName?.length > 2 && (
        <View>
          {nextItemType === "" && (
            <>
              <Text>Add a rest or a movement?</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.restButton]}
                  onPress={() => setNextItemType("rest")}
                >
                  <Text>Add Rest</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.movementButton]}
                  onPress={() => setNextItemType("movement")}
                >
                  <Text>Add Movement</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {nextItemType === "movement" && (
            <>
              {repOrTimed === null && (
                <>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.button, styles.restButton]}
                      onPress={() => setRepOrTimed("rep")}
                    >
                      <Text>Rep Movement</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.movementButton]}
                      onPress={() => setRepOrTimed("timed")}
                    >
                      <Text>Timed Movement</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}

              {repOrTimed === "rep" && (
                <>
                  <TextInput
                    placeholder="Number of Reps"
                    onChangeText={setNumReps}
                    value={numReps}
                    keyboardType="number-pad"
                  />
                  <TouchableOpacity onPress={addMovement}>
                    <Text>Add movement</Text>
                  </TouchableOpacity>
                </>
              )}

              {repOrTimed === "timed" && (
                <>
                  <Text>Rep Time Length:</Text>
                  <View style={styles.timeInputContainer}>
                    <View style={styles.timeInput}>
                      <Text
                        style={styles.triangle}
                        onPress={() =>
                          setRepLengthMin((prev) =>
                            prev < 59 ? prev + 1 : prev
                          )
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
                          setRepLengthMin((prev) =>
                            prev > 0 ? prev - 1 : prev
                          )
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
                          setRepLengthSec((prev) =>
                            prev < 59 ? prev + 1 : prev
                          )
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
                          setRepLengthSec((prev) =>
                            prev > 0 ? prev - 1 : prev
                          )
                        }
                      >
                        ▼
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={addMovement}>
                    <Text>Add movement</Text>
                  </TouchableOpacity>
                </>
              )}
            </>
          )}
          {nextItemType === "rest" && (
            <>
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
            </>
          )}
          {/* {repOrTimed !== null && (
            <TouchableOpacity onPress={addMovement}>
              <Text>Add movement</Text>
            </TouchableOpacity>
          )} */}

          {movements.length >= 1 && (
            <>
              <DraggableFlatList
                data={movements}
                renderItem={renderMovement}
                keyExtractor={(item, index) => index.toString()}
                onDragEnd={({ data }) => setMovements(data)}
              />
              <TouchableOpacity onPress={addExercise}>
                <Text>Add exercise</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
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
  exerciseNameContainer: {
    flexDirection: "row",
    // justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
  },
  restButton: {
    backgroundColor: "#f00", // red for rest
  },
  movementButton: {
    backgroundColor: "#0f0", // green for movement
  },
  nextButton: {
    backgroundColor: "#0f0",
    maxWidth: screenWidth * 0.15, // 20% of the screen width
  },
});

export default AddExercise;
