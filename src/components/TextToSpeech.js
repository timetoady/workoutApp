import { useEffect } from "react";
import * as Speech from "expo-speech";

const TextToSpeech = ({ text, onFinish }) => {
  useEffect(() => {
    const speak = async () => {
      await Speech.speak(text, {
        onDone: onFinish,
      });
    };

    if (text) {
      speak();
    }
  }, [text, onFinish]);

  return null;
};

export default TextToSpeech;
