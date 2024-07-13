import { FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import { API_ACCESS_TOKEN } from '@env'
import axios from 'axios'
import Loading from './Loading'
import {
  ListScreenNavigationProp,
  ListScreenRouteProp,
} from '../types/NavigationParams'
import { Movie, ScreenState } from '../types/app'
import MovieItem from '../component/movies/MovieItem'
import { Layout, Text } from '@ui-kitten/components'

const ListScreen = () => {
  const route = useRoute<ListScreenRouteProp>()
  const navigation = useNavigation<ListScreenNavigationProp>()
  const genre_id = route.params.genre.id
  const genre_name = route.params.genre.name

  navigation.setOptions({ title: genre_name })
  const [movieList, setMovieList] = useState<Movie[]>([])
  const [screen, setScreen] = useState<ScreenState>(ScreenState.Loading)
  const getMovie = async (): Promise<void> => {
    setScreen(ScreenState.Loading)
    const url = `https://api.themoviedb.org/3/discover/movie`

    try {
      const response = await axios.get(url, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_ACCESS_TOKEN}`,
        },
        params: {
          with_genres: genre_id,
        },
      })

      const data = response.data
      setMovieList(data.results)

      setScreen(ScreenState.Success)
    } catch (error) {
      console.log(error)
      setScreen(ScreenState.Error)
    }
  }

  useEffect(() => {
    getMovie()
  }, [])

  const RenderComponent = (): JSX.Element => {
    switch (screen) {
      case ScreenState.Success:
        return (
          <Layout style={styles.container}>
            <Text style={styles.genreTitle}>{genre_name}</Text>
            <FlatList
              data={movieList}
              renderItem={({ item }) => (
                <Layout style={styles.movieList}>
                  <MovieItem
                    movie={item}
                    size={coverImageSize['poster']}
                    coverType={'poster'}
                  />
                </Layout>
              )}
              numColumns={3}
              keyExtractor={(item) => item.id.toString()}
            />
          </Layout>
        )
      case ScreenState.Loading:
        return (
          <Layout style={{ height: '80%' }}>
            <Loading />
          </Layout>
        )
      case ScreenState.Error:
        return (
          <Layout>
            <Text>No movie found</Text>
          </Layout>
        )
      default:
        return <Layout />
    }
  }

  return <RenderComponent />
}
const coverImageSize = {
  backdrop: {
    width: 280,
    height: 160,
  },
  poster: {
    width: 100,
    height: 160,
  },
}
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '900',
  },
  container: {
    paddingBottom: 72,
  },
  movieList: {
    marginTop: 8,
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
export default ListScreen
