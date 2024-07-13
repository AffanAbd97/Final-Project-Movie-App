import React, { useEffect, useState } from 'react'
import {
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  FlatList,
  Text,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { API_ACCESS_TOKEN } from '@env'
import axios from 'axios'

import MovieItem from '../movies/MovieItem'
import { Movie, ScreenState } from '../../types/app'
import Loading from '../../screen/Loading'
import { Layout } from '@ui-kitten/components'

const KeywordSearch = () => {
  const [keyword, setKeyword] = useState<string>('')
  const [movieList, setMovieList] = useState<Movie[]>([])

  const [screen, setScreen] = useState<ScreenState>(ScreenState.Success)
  const getMovieList = async (): Promise<void> => {
    setScreen(ScreenState.Loading)
    const url = `https://api.themoviedb.org/3/search/movie`

    try {
      const response = await axios.get(url, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_ACCESS_TOKEN}`,
        },
        params: {
          query: keyword,
        },
      })

      const data = response.data
      setMovieList(data.results)
      if (keyword != '' && data.results.length <= 0) {
        setScreen(ScreenState.Error)
      } else {
        setScreen(ScreenState.Success)
      }
    } catch (error) {
      console.log(error)
      setScreen(ScreenState.Error)
    }
  }
  useEffect(() => {
    if (keyword !== '') {
      getMovieList()
    }
  }, [keyword])

  const onSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    e.preventDefault()
    setKeyword(e.nativeEvent.text)
  }
  const RenderComponent = (): JSX.Element => {
    switch (screen) {
      case ScreenState.Success:
        return (
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
  return (
    <Layout style={styles.outerContainer}>
      <Layout style={styles.container}>
        <Layout style={styles.searchSection}>
          <Feather
            style={styles.searchIcon}
            name="search"
            size={20}
            color="#222"
          />
          <TextInput
            style={styles.input}
            placeholder={'Search'}
            placeholderTextColor={'#222'}
            onSubmitEditing={onSubmit}
          />
        </Layout>
      </Layout>
      <RenderComponent />
    </Layout>
  )
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
  outerContainer: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
  },
  movieList: {
    marginTop: 8,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#222',
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    color: '#222',
  },
})

export default KeywordSearch
