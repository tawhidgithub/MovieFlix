import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'


interface props{

btnTitle:string,
onClick:()=>void
disabled?:boolean,
loading?:boolean



}


const CustomButton = ({btnTitle,onClick,disabled=false,loading=false}:props) => {
  return (
    <TouchableOpacity onPress={onClick} disabled={disabled} activeOpacity={0.7}>
        <View className={`flex-row items-center  py-5 px-20 justify-center my-2 rounded-xl  ${disabled ? "bg-gray-400":"bg-dark-100"} `}>

{loading? <ActivityIndicator size="small" color="#fff" /> :      <Text className='text-white text-xl' >{btnTitle}</Text>
}
        </View>
    </TouchableOpacity>
  )
}

export default CustomButton