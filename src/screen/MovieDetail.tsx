import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  DetailScreenNavigationProp,
  DetailScreenRouteProp,
} from '../types/NavigationParams'
import { Movie, ScreenState } from '../types/app'
import { API_ACCESS_TOKEN, API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from './Loading'
import { LinearGradient } from 'expo-linear-gradient'
import InfoText from '../component/InfoText'
import { formatDate } from '../helper/utils'
import MovieList from '../component/movies/MovieList'
import { FontAwesome } from '@expo/vector-icons'
import axios from 'axios'

const DetailScreen = (): JSX.Element => {
  const route = useRoute<DetailScreenRouteProp>()
  const navigation = useNavigation<DetailScreenNavigationProp>()
  navigation.setOptions({ title: 'Updated!' })
  const [movie, setMovie] = useState<Movie | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)

  const movie_id = route.params.id

  const [screen, setScreen] = useState<ScreenState>(ScreenState.Loading)

  const fetchData = async (): Promise<void> => {
    try {
      const ACCESS_TOKEN = API_ACCESS_TOKEN
      const URL = `${API_URL as string}/movie/${movie_id}`

      if (!ACCESS_TOKEN || !URL) {
        throw new Error('ENV not found')
      }

      const response = await axios.get(URL, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      setMovie(response.data)
    } catch (err) {
      console.error(err)
      setScreen(ScreenState.Error)
    }
  }

  useEffect(() => {
    setScreen(ScreenState.Loading)
    fetchData()
  }, [movie_id])

  useEffect(() => {
    if (movie) {
      setScreen(ScreenState.Success)
    }
  }, [movie])

  useEffect(() => {
    const check = async () => {
      setIsFavorite(await checkIsFavorite(movie_id))
    }
    check()
  }, [movie_id])

  const checkIsFavorite = async (id: number): Promise<boolean> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList')
      const favorites: Movie[] = initialData ? JSON.parse(initialData) : []
      return favorites.some((item) => item.id === id)
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const removeFavorite = async (id: number): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList')
      const favorites: Movie[] = initialData ? JSON.parse(initialData) : []
      const updatedFavorites = favorites.filter((item) => item.id !== id)
      await AsyncStorage.setItem(
        '@FavoriteList',
        JSON.stringify(updatedFavorites),
      )
      setIsFavorite(false)
    } catch (error) {
      console.log(error)
    }
  }

  const addFavorite = async (movie: Movie): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList')
      const favMovieList: Movie[] = initialData ? JSON.parse(initialData) : []
      favMovieList.push(movie)
      await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList))
      setIsFavorite(true)
    } catch (error) {
      console.log(error)
    }
  }

  const renderComponent = (): JSX.Element => {
    switch (screen) {
      case ScreenState.Success:
        return (
          <>
            {movie && (
              <Detail
                addFavorite={addFavorite}
                isFavorite={isFavorite}
                movie={movie}
                movie_id={movie_id}
                removeFavorite={removeFavorite}
              />
            )}
          </>
        )
      case ScreenState.Loading:
        return <Loading />
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

  return renderComponent()
}

type DetailProps = {
  movie: Movie
  isFavorite: boolean
  removeFavorite: (id: number) => void
  addFavorite: (movie: Movie) => void
  movie_id: number
}

const Detail = ({
  movie,
  isFavorite,
  addFavorite,
  removeFavorite,
  movie_id,
}: DetailProps) => {
  const handleFavorite = () => {
    isFavorite ? removeFavorite(movie_id) : addFavorite(movie as Movie)
  }
  const styles = StyleSheet.create({
    backgroundImage: {
      height: 240,
    },
    backgroundImageStyle: {
      borderRadius: 0,
    },
    movieTitle: {
      color: 'white',
    },
    gradientStyle: {
      padding: 8,
      height: '100%',
      width: '100%',
      borderRadius: 8,
      display: 'flex',
      justifyContent: 'flex-end',
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
    },
    movieContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rating: {
      color: 'yellow',
      fontWeight: '700',
    },
    padding: {
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    overview: {
      fontSize: 14,
    },
    infoWrapper: {
      marginTop: 16,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  })
  return (
    <View>
      <ImageBackground
        resizeMode="cover"
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
        }}
      >
        <LinearGradient
          colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
          locations={[0.6, 0.8]}
          style={styles.gradientStyle}
        >
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <View style={styles.movieContainer}>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={16} color="yellow" />
              <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
            </View>
            <TouchableOpacity onPress={handleFavorite}>
              <FontAwesome
                name={isFavorite ? 'heart' : 'heart-o'}
                size={16}
                color="pink"
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.padding}>
        <Text style={styles.overview}>{movie.overview}</Text>
        <View style={styles.infoWrapper}>
          <InfoText text={movie.original_language} title="Original Language" />
          <InfoText text={`${movie.popularity}`} title="Popularity" />
          <InfoText
            text={formatDate(movie.release_date)}
            title="Release Date"
          />
          <InfoText text={`${movie.vote_count}`} title="Vote Count" />
        </View>
      </View>
      <MovieList
        title={'Recommendation'}
        path={`/movie/${movie_id}/recommendations`}
        coverType={'poster'}
      />
    </View>
  )
}

export default DetailScreen
