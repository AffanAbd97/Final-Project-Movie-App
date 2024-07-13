import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import type { MovieListProps, Movie } from '../../types/app'
import { API_ACCESS_TOKEN } from '@env'
import MovieItem from './MovieItem'
import axios from 'axios'
import { Button, Layout, List, Spinner, Text } from '@ui-kitten/components'
import { StackActions, useNavigation } from '@react-navigation/native'
export const coverImageSize = {
  backdrop: {
    width: 360,
    height: 205,
  },
  poster: {
    width: 129,
    height: 192,
  },
}

const MovieList = ({
  title,
  path,
  coverType,
  label,
  button = true,
}: MovieListProps): JSX.Element => {
  const [movies, setMovies] = useState<Movie[]>([])
  const navigation = useNavigation()
  const [loading, setLoading] = useState<boolean>(false)
  const pushAction = StackActions.push('More', { url: path, title: label })
  useEffect(() => {
    getMovieList()
  }, [])

  const getMovieList = (): void => {
    setLoading(true)
    const url = `https://api.themoviedb.org/3/${path}`

    axios
      .get(url, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_ACCESS_TOKEN}`,
        },
      })
      .then((response) => {
        const data = response.data
        setMovies(data.results)
        setLoading(false)
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
        setLoading(false)
      })
  }
  const handleMore = () => {
    navigation.dispatch(pushAction)
  }
  return (
    <Layout>
      <Layout style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {button && (
          <Button
            style={styles.button}
            appearance="ghost"
            size="small"
            onPress={handleMore}
            status="info"
          >
            Lihat Semua
          </Button>
        )}
      </Layout>
      {loading ? (
        <Layout
          style={{
            height: coverImageSize[coverType].height / 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Spinner status="info" />
        </Layout>
      ) : (
        <List
          style={{
            ...styles.movieList,
            maxHeight: coverImageSize[coverType].height,
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={movies.slice(0, 5)}
          renderItem={({ item }) => (
            <MovieItem
              movie={item}
              size={coverImageSize[coverType]}
              coverType={coverType}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </Layout>
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: 16,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    padding: 0,
    margin: 0,
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
  },
  movieList: {
    marginTop: 8,
  },
})

export default MovieList
