import { Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet } from 'react-native'

type Props = {
  title: string
  text: string
}

const InfoText = ({ title, text }: Props) => {
  return (
    <Layout style={styles.flexChild}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text>{text}</Text>
    </Layout>
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
