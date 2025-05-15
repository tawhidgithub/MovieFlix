import TextField from '@/components/textField'
import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'

export class LoginScreen extends Component {
  render() {
    return (
      <ScrollView className='bg-primary flex-1 '>

        <View className='flex-1 flex-col items-center  pt-36  px-5'  >


        <Text className='text-white text-6xl font-bold mb-36' >Email</Text>
        <View className='w-full flex-1 gap-6'>

        <TextField placeHolder={'Email'}/>
        <TextField placeHolder={'Password'}/>
        </View>

        </View>
      </ScrollView>
    )
  }
}

export default LoginScreen