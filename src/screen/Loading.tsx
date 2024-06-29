import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator color={'#b392f0'} size="large" />
    </View>
  )
}

export default Loading
