import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { StyleSheet, RefreshControl } from 'react-native'
import { Movie } from '../types/app'
import MovieItem from '../component/movies/MovieItem'
import { Layout, List } from '@ui-kitten/components'

function FavoriteScreen(): JSX.Element {
  const [favoriteList, setFavoriteList] = useState<Movie[]>([])
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const getAllData = async (): Promise<Movie[]> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList')

      const favorites: Movie[] = initialData ? JSON.parse(initialData) : []
      return favorites
    } catch (error) {
      console.log(error)
      return []
    }
  }

  const loadData = async () => {
    const data = await getAllData()
    setFavoriteList(data)
  }

  useEffect(() => {
    loadData()
    return () => {
      setFavoriteList([])
    }
  }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    await loadData()
    setRefreshing(false)
  }

  return (
    <Layout style={{ height: '100%', width: '100%' }}>
      <Layout style={styles.container}>
        <List
          style={{
            flex: 1,
            alignSelf: 'center',
            width: '100%',
            height: '100%',
            marginLeft: 20,
          }}
          data={favoriteList}
          renderItem={({ item }) => (
            <Layout style={styles.movieList}>
              <MovieItem
                movie={item}
                size={coverImageSize['poster']}
                coverType={'poster'}
              />
            </Layout>
          )}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </Layout>
    </Layout>
  )
}

const coverImageSize = {
  backdrop: {
    width: 280,
    height: 160,
  },
  poster: {
    width: 180,
    height: 288,
  },
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    paddingBottom: 0,
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
  },
  movieList: {
    marginTop: 8,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
})

export default FavoriteScreen
