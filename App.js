import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WorkoutList from "./src/screens/WorkoutList";
import NewWorkout from "./src/screens/NewWorkout";
import AddExercise from "./src/components/AddExercise";
import SplashScreen from "./src/screens/SplashScreen";

const Stack = createStackNavigator();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 1500); // Show splash screen for 3 seconds

    return () => clearTimeout(splashTimeout);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="WorkoutList" component={WorkoutList} />
        <Stack.Screen name="NewWorkout" component={NewWorkout} />
        <Stack.Screen name="AddExercise" component={AddExercise} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
