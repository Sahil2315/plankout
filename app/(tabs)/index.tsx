import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import { Workout } from "@/types";
import "../../global.css";
import { Starter } from "@/components/ExerciseStarter";

export default function HomeScreen() {
  let [workout, setWorkout] = useState<Workout[]>([]);
  let [ovVisible, setOvVisible] = useState<boolean>(false)
  useEffect(() => {
    if (workout.length != 0) return;
    async function init() {
      const req = await fetch("http://127.0.0.1:8000/gemini", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resp = await req.json();
      console.log(resp);
      setWorkout(resp);
    }
    init();
  }, []);
  let today = new Date();
  let weekDay = today.getDay();
  return (
    <ScrollView className="w-full flex flex-col items-center">
      {workout.map((day, index) => {
        return (
          <View className="mt-4" key={index}>
            <Text className="text-xl" style={styles.texWhite}>
              {day.weekDay}
            </Text>
            <View
              className={index == weekDay - 1 ? "flex flex-col mt-2" : "hidden"}
            >
              <View className="flex flex-col">
                {day.workout.map((ex, eIndex) => {
                  return (
                    <View key={eIndex}>
                      <Text style={styles.texWhite}>{ex.exName}</Text>
                    </View>
                  );
                })}
              </View>
              <Pressable onPress={() => setOvVisible(true)}
                className="py-1 mt-4 rounded-lg px-2 w-max bg-slate-800 hover:bg-indigo-700/50"
                android_ripple={{ color: "indigo" }}
              >
                <Text className="text-white text-[18px]">Start</Text>
              </Pressable>
            </View>
          </View>
        );
      })}
      <Starter exercises={workout[weekDay - 1]?.workout} visible={ovVisible} setVisible={setOvVisible} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  texWhite: {
    color: "#FFFFFF",
  },
});
