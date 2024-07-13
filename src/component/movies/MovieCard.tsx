// App.js
import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { Layout, Card, Text, Icon } from '@ui-kitten/components'
import { MovieCardProps } from '../../types/app'
import { formatDate } from '../../helper/utils'
// import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { useNavigation, StackActions } from '@react-navigation/native'
const MovieCard = ({ movie, showGenre }: MovieCardProps) => {
  const navigation = useNavigation()
  const pushAction = StackActions.push('Detail', { id: movie.id })

  return (
    <Card
      style={styles.card}
      onPress={() => {
        navigation.dispatch(pushAction)
      }}
    >
      <Layout style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
        />
        <Layout style={styles.details}>
          <Text category="h6">{movie.title}</Text>
          <Layout style={styles.row}>
            <Icon name="calendar-outline" pack="eva" style={styles.icon} />
            <Text category="s1">{formatDate(movie.release_date)}</Text>
          </Layout>
          <Layout style={styles.row}>
            <Icon name="star" pack="eva" style={styles.icon} />
            <Text category="s1">{movie.vote_average.toFixed(1)}/10 IMDb</Text>
          </Layout>
          {showGenre && (
            <Layout style={styles.row}>
              <Text style={styles.tag} category="c2">
                Animation
              </Text>
              <Text style={styles.tag} category="c2">
                Comedy
              </Text>
            </Layout>
          )}
        </Layout>
      </Layout>
    </Card>
  )
}

export default MovieCard

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    borderRadius: 10,
  },
  container: {
    flexDirection: 'row',
  },
  image: {
    width: 100,

    borderRadius: 10,
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  tag: {
    backgroundColor: '#eef2ff',
    borderRadius: 5,
    paddingHorizontal: 5,
    marginRight: 5,
  },
})
