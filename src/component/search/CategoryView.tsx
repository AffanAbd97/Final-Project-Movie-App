import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import { useNavigation, StackActions } from '@react-navigation/native'
import { Genre } from '../../types/app'
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
    <View style={styles.container}>
      <View style={styles.genreContainer}>
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
            <Text>{genre.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={handleSearch}
        disabled={selectedGenre == null}
      >
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CategoryView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  genreButton: {
    width: '48%',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#e0d7ec',
    borderRadius: 15,
    alignItems: 'center',
  },
  selectedGenreButton: {
    backgroundColor: '#B39DDB',
  },
  genreText: {
    fontSize: 16,
    color: '#000',
  },
  searchButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#9575CD',
    borderRadius: 25,
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
})
