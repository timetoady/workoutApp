import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";

const NewWorkout = ({ navigation }) => {
  const [workoutName, setWorkoutName] = useState("");

  return (
    <View>
      <TextInput
        placeholder="Workout Name"
        onChangeText={setWorkoutName}
        value={workoutName}
      />
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
    </View>
  );
};

export default NewWorkout;
