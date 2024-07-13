import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  MoreScreenNavigationProp,
  MoreScreenRouteProp,
} from '../types/NavigationParams'
import { useNavigation, useRoute } from '@react-navigation/native'
import { API_ACCESS_TOKEN } from '@env'
import axios from 'axios'
import { Movie, ScreenState } from '../types/app'
import Loading from './Loading'

import MovieCard from '../component/movies/MovieCard'

const MoreScreen = () => {
  const route = useRoute<MoreScreenRouteProp>()
  const navigation = useNavigation<MoreScreenNavigationProp>()
  const genre_name = route.params.title

  const [movieList, setMovieList] = useState<Movie[]>([])
  const [screen, setScreen] = useState<ScreenState>(ScreenState.Loading)
  navigation.setOptions({ title: genre_name })

  const url = route.params.url
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async (): Promise<void> => {
    try {
      const ACCESS_TOKEN = API_ACCESS_TOKEN
      const URL = `https://api.themoviedb.org/3/${url}`

      if (!ACCESS_TOKEN || !URL) {
        throw new Error('ENV not found')
      }

      const response = await axios.get(URL, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      setMovieList(response.data.results)
      setScreen(ScreenState.Success)
    } catch (err) {
      console.error(err)
      setScreen(ScreenState.Error)
    }
  }

  const RenderComponent = (): JSX.Element => {
    switch (screen) {
      case ScreenState.Success:
        return (
          <View style={styles.container}>
            {/* <Text style={styles.genreTitle}>{genre_name}</Text> */}
            <FlatList
              data={movieList}
              renderItem={({ item }) => (
                <View style={styles.movieList}>
                  <MovieCard movie={item} showGenre={false} />
                  {/* <MovieItem
                    movie={item}
                    size={coverImageSize['poster']}
                    coverType={'poster'}
                  /> */}
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        )
      case ScreenState.Loading:
        return (
          <View style={{ height: '80%' }}>
            <Loading />
          </View>
        )
      case ScreenState.Error:
        return (
          <View>
            <Text>No movie found</Text>
          </View>
        )
      default:
        return <View />
    }
  }

  return <RenderComponent />
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '900',
  },
  container: {
    backgroundColor: 'white',
  },
  movieList: {
    marginTop: 8,
    marginHorizontal: 16,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  genreTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 26,
    paddingVertical: 16,
  },
})
export default MoreScreen
