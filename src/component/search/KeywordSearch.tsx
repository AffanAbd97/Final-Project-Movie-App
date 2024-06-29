import React, { useEffect, useState } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  FlatList,
  Text,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { API_ACCESS_TOKEN, API_URL } from '@env'
import axios from 'axios'

import MovieItem from '../movies/MovieItem'
import { Movie, ScreenState } from '../../types/app'
import Loading from '../../screen/Loading'

const KeywordSearch = () => {
  const [keyword, setKeyword] = useState<string>('')
  const [movieList, setMovieList] = useState<Movie[]>([])

  const [screen, setScreen] = useState<ScreenState>(ScreenState.Success)
  const getMovieList = async (): Promise<void> => {
    setScreen(ScreenState.Loading)
    const url = `${API_URL}/search/movie`

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
              <View style={styles.movieList}>
                <MovieItem
                  movie={item}
                  size={coverImageSize['poster']}
                  coverType={'poster'}
                />
              </View>
            )}
            numColumns={3}
            keyExtractor={(item) => item.id.toString()}
          />
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
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.searchSection}>
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
        </View>
      </View>
      <RenderComponent />
    </View>
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
