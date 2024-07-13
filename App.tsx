import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigator from './src/navigation/BottomTabNavigation'
import React from 'react'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
export default function App(): JSX.Element {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </>
  )
}
