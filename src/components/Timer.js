import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

const Timer = ({ duration, onTimerEnd }) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);

  useEffect(() => {
    if (timeRemaining === 0) {
      onTimerEnd();
      return;
    }

    const timer = setTimeout(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeRemaining, onTimerEnd]);

  return (
    <View>
      <Text>{timeRemaining}</Text>
    </View>
  );
};

export default Timer;
