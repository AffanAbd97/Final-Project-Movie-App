import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { API_ACCESS_TOKEN, API_URL } from '@env'
import axios from 'axios'

import CategoryView from './CategoryView'
import { Genre, ScreenState } from '../../types/app'
import Loading from '../../screen/Loading'

const CategorySearch = () => {
  const [genres, setGenres] = useState<Genre[]>([])
  const [screen, setScreen] = useState<ScreenState>(ScreenState.Loading)
  const getGenres = async (): Promise<void> => {
    setScreen(ScreenState.Loading)
    const url = `${API_URL}/genre/movie/list`

    try {
      const response = await axios.get(url, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_ACCESS_TOKEN}`,
        },
      })

      const data = response.data
      setGenres(data.genres)

      setScreen(ScreenState.Success)
    } catch (error) {
      console.log(error)
      setScreen(ScreenState.Error)
    }
  }
  useEffect(() => {
    getGenres()
  }, [])
  const RenderComponent = (): JSX.Element => {
    switch (screen) {
      case ScreenState.Success:
        return <CategoryView genres={genres} />
      case ScreenState.Loading:
        return (
          <View style={{ height: '80%' }}>
            <Loading />
          </View>
        )
      case ScreenState.Error:
        return (
          <View>
            <Text>No Categories</Text>
          </View>
        )
      default:
        return <View />
    }
  }
  return <RenderComponent />
}

export default CategorySearch
