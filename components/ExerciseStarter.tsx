import { Exercise } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { View, Pressable, Text } from 'react-native';

export function Starter({exercises, visible, setVisible}: {exercises: Exercise[], visible: boolean, setVisible: Dispatch<SetStateAction<boolean>>}){
    if (!exercises) return (<View />)
    const [curExercise, setCurExercise] = useState<number>(0)
    const [rotation, toggleRotation] = useState<boolean>(false)
    const [promptVisible, togglePrompt] = useState<boolean>(true)
    const [setArr, resetSArr] = useState<number[]>([])
    const [finished, toggleFinished] = useState<boolean>(false)
    useEffect(() => {
        resetSArr(new Array(exercises?.length).fill(0))
    }, [])
    function selectRotation(bol: boolean){
        toggleRotation(bol)
        togglePrompt(false)
    }
    function proceed (){
        let temp = [...setArr]
        temp[curExercise] += 1
        resetSArr(temp)
        if(rotation){
            let ind = curExercise + 1
        }
    }
    return(
        <View className={visible ? '': 'hidden'}>
            {/* Prompt for Rotation Mode On/Off */}
            <View className={promptVisible ? 'w-[500px] h-[500px] flex z-40 flex-row items-center justify-center': 'hidden'}>
                <Pressable onPress={() => selectRotation(true)} className="py-1 px-2 rounded-lg bg-indigo-600/50 hover:bg-indigo-600/70">
                    <Text className="text-white">Rotation On</Text>
                </Pressable>
                <Pressable onPress={() => selectRotation(false)} className="py-1 px-2 rounded-lg bg-indigo-600/50 hover:bg-indigo-600/70">
                    <Text className="text-white">Rotation Off</Text>
                </Pressable>
            </View>
            {/* Actual Content */}
            <View className="w-full h-full flex z-30 flex-row items-center justify-center">
                <Text className="text-white">
                    {setArr[curExercise]}th Set for {exercises[curExercise].exName}
                </Text>
                <Text className="text-white">
                    {exercises[curExercise].exDesc}
                </Text>
                <Pressable onPress={proceed} className="py-1 px-2 rounded-lg bg-indigo-600/50 hover:bg-indigo-600/70">
                    <Text className="text-white">Done</Text>
                </Pressable>
            </View>
            <View className={finished ? '' : 'hidden'}>
                <Text>Workout Finished</Text>
            </View>
        </View>
    )
}