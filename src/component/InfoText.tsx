import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type Props = {
  title: string
  text: string
}

const InfoText = ({ title, text }: Props) => {
  return (
    <View style={styles.flexChild}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  infoTitle: {
    fontWeight: 'bold',
  },

  flexChild: {
    flexBasis: '50%',
  },
})
export default InfoText
