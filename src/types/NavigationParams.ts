import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Genre } from './app'

export type RootStackParamList = {
  Home: undefined
  Detail: { id: number }
  More: { url: string; title: string }
  List: { genre: Genre }
}

export type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>
export type ListScreenRouteProp = RouteProp<RootStackParamList, 'List'>
export type MoreScreenRouteProp = RouteProp<RootStackParamList, 'More'>

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>

export type DetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Detail'
>
export type ListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'List'
>
export type MoreScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'More'
>
