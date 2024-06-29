import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import DetailScreen from '../screen/MovieDetail'
import FavoriteScreen from '../screen/FavoriteScreen'
import SearchScreen from '../screen/SearchScreen'
import ListScreen from '../screen/ListScreen'
import HomeScreen from '../screen/HomeScreen'

const Stack = createNativeStackNavigator()
function HomeStackNavigation(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName="Index">
      <Stack.Screen
        name="Index"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  )
}
function FavoriteStackNavigation(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName="FavoriteScreen">
      <Stack.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  )
}
function SearchStackNavigation(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName="SearchScreen">
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="List" component={ListScreen} />
    </Stack.Navigator>
  )
}

export { HomeStackNavigation, FavoriteStackNavigation, SearchStackNavigation }
