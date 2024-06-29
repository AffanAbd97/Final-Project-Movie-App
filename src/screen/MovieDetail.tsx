import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { Movie } from "../types/app";
import MovieItem from "../component/movies/MovieItem";
import { coverImageSize } from "../component/movies/MovieList";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Button, FlatList,
  StyleSheet,
  TouchableOpacity, Image, ImageBackground  } from 'react-native'
import { API_URL, API_ACCESS_TOKEN } from '@env'

const MovieDetail = ({ route }: { route: RouteProp<any> }) => {
  const [movieDetail, setMovieDetail] = useState<Movie>();
  const [movieRecommendation, setMovieRecommendation] = useState<Movie[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const getMovieDetail = (): void => {
    const url = `https://api.themoviedb.org/3/movie/${route.params?.id}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        setMovieDetail(response);
      })
      .catch((errorResponse) => {
        console.error(errorResponse);
      });
  };

  const getMovieRecommendation = (): void => {
    const url = `https://api.themoviedb.org/3/movie/${route.params?.id}/recommendations`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        setMovieRecommendation(response.results);
      })
      .catch((errorResponse) => {
        console.error(errorResponse);
      });
  };

  const addFavorite = async (movie: Movie): Promise<void> => {
    try {
      const initialData: string | null = await AsyncStorage.getItem(
        "@FavoriteList"
      );
      console.log(initialData);

      let favMovieList: Movie[] = [];

      if (initialData !== null) {
        favMovieList = [...JSON.parse(initialData), movie];
      } else {
        favMovieList = [movie];
      }

      await AsyncStorage.setItem("@FavoriteList", JSON.stringify(favMovieList));
      setIsFavorite(true);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavorite = async (id: number): Promise<void> => {
    try {
      const initialData: string | null = await AsyncStorage.getItem(
        "@FavoriteList"
      );
      console.log(initialData, id);
      // Tulis code untuk menghapus film dari storage
      // 1. filter data by id
      // 2. set localStoragenya
      // 3. jangan lupa setFavorite jadi false
    } catch (error) {
      console.log(error);
    }
  };

  const checkIsFavorite = async (id: number) => {
    try {
      const initialData: string | null = await AsyncStorage.getItem(
        "@FavoriteList"
      );
      const parsedData: Movie[] = JSON.parse(initialData as string);

      if (initialData !== null) {
        const checkFavorite = parsedData.find((movie) => movie.id === id);
        if (checkFavorite) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovieDetail();
    getMovieRecommendation();
  }, []);

  useEffect(() => {
    checkIsFavorite(movieDetail?.id as number);
  }, [movieDetail]);

  return (
    
    <View style={{ flex: 1 }}>
      {movieDetail?.backdrop_path && (
        <ImageBackground
          source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetail.backdrop_path}` }}
          style={styles.headerImage}
          resizeMode="cover"
        >
          <View style={styles.headerOverlay}>
            <Text style={styles.title}>{movieDetail?.original_title}</Text>
            <Text style={styles.overview}>{movieDetail?.overview}</Text>
          </View>
        </ImageBackground>
      )}
      <View style={styles.content}>
        <Text style={styles.recommendationTitle}>Recommendations</Text>
        <FlatList
          style={styles.movieList}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={movieRecommendation}
          renderItem={({ item }) => (
            <MovieItem
              movie={item}
              size={coverImageSize["poster"]}
              coverType={"poster"}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />

        <View style={styles.favoriteButtonContainer}>
          <TouchableOpacity
            onPress={() =>
              !isFavorite
                ? addFavorite(movieDetail as Movie)
                : removeFavorite(movieDetail?.id as number)
            }
          >
            <FontAwesome
              name={isFavorite ? "heart" : "heart-o"}
              size={60}
              color={"blue"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: 300,
    justifyContent: 'flex-end',
  },
  headerOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
  },
  overview: {
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  recommendationTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  movieList: {
    paddingLeft: 4,
    marginTop: 8,
    marginBottom: 20,
    maxHeight: 160,
  },
  favoriteButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});