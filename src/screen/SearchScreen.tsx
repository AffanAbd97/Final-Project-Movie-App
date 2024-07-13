import React, { useState } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import KeywordSearch from '../component/search/KeywordSearch'
import CategorySearch from '../component/search/CategorySearch'
import { Layout } from '@ui-kitten/components'

const SearchScreen = (): JSX.Element => {
  const [selectedBar, setSelectedBar] = useState<string>('keyword')

  return (
    <Layout style={styles.container}>
      <Layout style={styles.innerContainer}>
        <Layout style={styles.topBarContainer}>
          {['keyword', 'category'].map((item: string, index: number) => (
            <TouchableOpacity
              key={item}
              activeOpacity={0.9}
              style={{
                ...styles.topBar,
                backgroundColor: item === selectedBar ? '#3F88C5' : '#82a6c5',
                borderTopLeftRadius: index === 0 ? 100 : 0,
                borderBottomLeftRadius: index === 0 ? 100 : 0,
                borderTopRightRadius: index === 1 ? 100 : 0,
                borderBottomRightRadius: index === 1 ? 100 : 0,
              }}
              onPress={() => {
                setSelectedBar(item)
              }}
            >
              <Text style={styles.topBarLabel}>{item}</Text>
            </TouchableOpacity>
          ))}
        </Layout>
        {selectedBar === 'keyword' ? <KeywordSearch /> : <CategorySearch />}
      </Layout>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  topBarContainer: {
    display: 'flex',

    flexDirection: 'row',
    width: '100%',
  },
  topBar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: 60,
  },
  topBarLabel: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
    textTransform: 'capitalize',
  },
})

export default SearchScreen
