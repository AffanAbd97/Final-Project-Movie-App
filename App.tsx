import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigator from './src/navigation/BottomTabNavigation'
import React from 'react'

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  )
}
