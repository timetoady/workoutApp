import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';

const WorkoutList = ({ navigation }) => {
  const [darkMode, setDarkMode] = useState(false);

  const backgroundColor = darkMode ? '#1a1a1a' : '#eeeeee';
  const textColor = darkMode ? '#eeeeee' : '#111111';
  const buttonColor = darkMode ? '#111111' : 'transparent';
  const pressedButtonColor = darkMode ? '#00a0ff' : '#111111';
  const borderColor = darkMode ? '#00a0ff' : '#111111';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.toggleContainer}>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>
      {/* Display saved workouts here */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('NewWorkout')}
          style={[
            styles.createWorkoutButton,
            { backgroundColor: buttonColor, borderColor: borderColor },
          ]}
          onShowUnderlay={({ target }) => (target.style.backgroundColor = pressedButtonColor)}
          onHideUnderlay={({ target }) => (target.style.backgroundColor = buttonColor)}
        >
          <Text style={[styles.createWorkoutText, { color: textColor }]}>Create a new workout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggleContainer: {
    alignItems: 'flex-end',
    marginRight: 10,
    marginTop: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '20%',
  },
  createWorkoutButton: {
    borderRadius: 50,
    borderWidth: 2,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  createWorkoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WorkoutList;
