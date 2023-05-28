import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

const NewWorkout = ({ navigation }) => {
  const [workoutName, setWorkoutName] = useState("");

  return (
    <View style={styles.addExerciseContainer}>
      <TextInput
        placeholder="Workout Name"
        onChangeText={setWorkoutName}
        value={workoutName}
      />
      {workoutName.length > 2 && (
        <>
          <TouchableOpacity onPress={() => navigation.navigate("AddExercise")}>
            <Text>Add an exercise</Text>
          </TouchableOpacity>
          {/* Render added exercises here */}
          <TouchableOpacity
            onPress={() => {
              /* Save workout */
            }}
          >
            <Text>Save workout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  addExerciseContainer: {
    paddingLeft: 8,
  },
});

export default NewWorkout;
