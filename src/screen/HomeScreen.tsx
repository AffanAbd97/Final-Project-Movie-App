import React from 'react'
import { ScrollView, StatusBar, StyleSheet } from 'react-native'
import { MovieListProps } from '../types/app'
import MovieList from '../component/movies/MovieList'
import { Avatar, Layout, Text } from '@ui-kitten/components'
const movieLists: MovieListProps[] = [
  {
    title: 'Now Playing in Theater',
    path: 'movie/now_playing?language=en-US&page=1',
    coverType: 'backdrop',
    label: 'Now Playing',
  },
  {
    title: 'Upcoming Movies',
    path: 'movie/upcoming?language=en-US&page=1',
    coverType: 'poster',
    label: 'Upcoming',
  },
  {
    title: 'Top Rated Movies',
    path: 'movie/top_rated?language=en-US&page=1',
    coverType: 'poster',
    label: 'Top Rated',
  },
  {
    title: 'Popular Movies',
    path: 'movie/popular?language=en-US&page=1',
    coverType: 'poster',
    label: 'Popular',
  },
]
const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: 'white',
    paddingTop: StatusBar.currentHeight ?? 32,
  },
  title: { fontWeight: 'bold', color: '#3F88C5', fontSize: 20 },
  subtitle: { fontSize: 12 },
})
function HomeScreen(): JSX.Element {
  return (
    <ScrollView style={styles.container}>
      <Layout
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <Layout>
          <Text style={styles.title}>Hello, Selamat Datang 👋</Text>
          <Text style={styles.subtitle}>
            Temukan film yang cocok dengan selera kamu.
          </Text>
        </Layout>
        <Avatar source={require('../../assets/user.png')} />
      </Layout>
      <Layout>
        {movieLists.map((movieList) => (
          <MovieList
            title={movieList.title}
            path={movieList.path}
            coverType={movieList.coverType}
            label={movieList.label}
            key={movieList.title}
          />
        ))}
        <StatusBar translucent={false} />
      </Layout>
      <Layout style={{ height: 32 }} />
    </ScrollView>
  )
}

export default HomeScreen
