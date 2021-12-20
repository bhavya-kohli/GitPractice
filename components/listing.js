import React from "react";
import { Text,View } from "react-native";

export default function Listing({list}){
    return (
        <View>
            {list.map(item=>{
                return (
                    <View key={item.time}>
                    <Text>{item.text}</Text>
                    <Text>{item.time}</Text>
                    </View>
                )
            })}
        </View>
    );
}