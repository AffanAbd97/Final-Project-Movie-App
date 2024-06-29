import React from 'react'
import {  ScrollView, View, StatusBar, StyleSheet, Text  } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import type { MovieListProps } from '../types/app'
import MovieList from '../component/movies/MovieList'



const movieLists: MovieListProps[] = [
  {
    title: 'Now Playing in Theater',
    path: 'movie/now_playing?language=en-US&page=1',
    coverType: 'backdrop',
  },
  {
    title: 'Upcoming Movies',
    path: 'movie/upcoming?language=en-US&page=1',
    coverType: 'poster',
  },
  {
    title: 'Top Rated Movies',
    path: 'movie/top_rated?language=en-US&page=1',
    coverType: 'poster',
  },
  {
    title: 'Popular Movies',
    path: 'movie/popular?language=en-US&page=1',
    coverType: 'poster',
  },
]

const Home = (): JSX.Element => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>MovieApp</Text>
        {movieLists.map((movieList) => (
          <MovieList
            title={movieList.title}
            path={movieList.path}
            coverType={movieList.coverType}
            key={movieList.title}
          />
        ))}
        <StatusBar translucent={false} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    
    // alignItems: 'center',
    // justifyContent: 'center',
   
    
  },
text:{
  marginTop:20,
  position:'relative',
  fontSize: 40,
  textAlign:'left',
  left:20,
  
  
}
})

export default Home

// export default function Home({navigation}: any): JSX.Element {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home</Text>
//       <Button
//         title="next"
//         onPress={() => {
//           navigation.navigate('MovieDetail')
//         }}
//       />
//     </View>
    

//   )
// }

