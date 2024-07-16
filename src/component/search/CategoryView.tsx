import { StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import { useNavigation, StackActions } from '@react-navigation/native'
import { Genre } from '../../types/app'
import { Layout, Text } from '@ui-kitten/components'
type Props = {
  genres: Genre[]
}

const CategoryView = ({ genres }: Props) => {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null)
  const handleSelectGenre = (genre: Genre) => {
    setSelectedGenre(genre)
  }
  const navigation = useNavigation()
  const pushAction = StackActions.push('List', { genre: selectedGenre })
  const handleSearch = () => {
    navigation.dispatch(pushAction)
  }
  return (
    <Layout style={styles.container}>
      <Layout style={styles.genreContainer}>
        {genres.map((genre, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.genreButton,
              selectedGenre &&
                selectedGenre === genre &&
                styles.selectedGenreButton,
            ]}
            onPress={() => handleSelectGenre(genre)}
          >
            <Text style={styles.genreText}>{genre.name}</Text>
          </TouchableOpacity>
        ))}
      </Layout>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={handleSearch}
        disabled={selectedGenre == null}
      >
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </Layout>
  )
}

export default CategoryView

const styles = StyleSheet.create({
  container: {
    flex: 1,

    height: '100%',
  },
  genreContainer: {
    flexDirection: 'row',
    padding: 20,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  genreButton: {
    width: '48%',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#9bcfff',
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedGenreButton: {
    backgroundColor: '#3f88c5',
    tintColor: 'white',
  },
  genreText: {
    fontSize: 16,
    // color: '#000',
  },
  searchButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#3f88c5',
    borderRadius: 5,
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
})
